<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Account;
use App\Http\Resources\TransactionsResource;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SummaryController extends Controller
{
    public function getMainDashboard(Request $request) {
        try {
            $userId = $request->user()->user_id;
            $now = Carbon::now();

            // Balance group by currency
            $balancesByCurrency = Account::where('user_id', $userId)
                ->select('currency', DB::raw('SUM(balance) as total'))
                ->groupBy('currency')
                ->get()
                ->map(function($item) {
                    return [
                        'currency' => $item->currency,
                        'total' => (float) $item->total
                    ];
                });

            $monthTotals = Transaction::where('user_id', $userId)
                ->whereMonth('date', $now->month)
                ->whereYear('date', $now->year)
                ->selectRaw("
                    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
                    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
                ")
                ->first();

            return response()->json([
                'balances' => $balancesByCurrency,
                'month_income'  => (float) ($monthTotals->income ?? 0),
                'month_expense' => (float) ($monthTotals->expense ?? 0),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getSavingsDashboard(Request $request) {
        $userId = $request->user()->user_id;

        $historicalSavings = Transaction::where('user_id', $userId)
            ->selectRaw("
                TO_CHAR(date, 'Mon') as month_name,
                EXTRACT(MONTH FROM date) as month_num,
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
            ")
            ->where('date', '>=', Carbon::now()->startOfMonth()->subMonths(5))
            ->groupBy(DB::raw("TO_CHAR(date, 'Mon'), EXTRACT(MONTH FROM date)"))
            ->orderBy('month_num')
            ->get()
            ->map(function ($item) {
                $income = (float) $item->income;
                $expense = (float) $item->expense;
                $surplus = $income - $expense;

                return [
                    'month' => $item->month_name,
                    'savings' => (float) $surplus, 
                    'savings_rate' => $income > 0 ? round(($surplus / $income) * 100, 2) : 0,
                    'income' => $income,
                    'expense' => $expense
                ];
            });

        return response()->json([
            'savings_trend' => $historicalSavings
        ]);
    }
}