<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Account;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SummaryController extends Controller
{
    public function getMainDashboard(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['error' => 'Unauthenticated'], 401);
            }

            $userId = $user->user_id;
            $now = Carbon::now();

            // Balance by currency
            $balancesByCurrency = Account::where('user_id', $userId)
                ->select('code_currency as currency', DB::raw('SUM(balance) as total'))
                ->groupBy('code_currency')
                ->get()
                ->map(fn($item) => [
                    'currency' => $item->currency,
                    'total' => (float) $item->total
                ]);

            // Monthly totals
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
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getExpenseAnalysis(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['error' => 'Unauthenticated'], 401);
            }

            $userId = $user->user_id;
            $now = Carbon::now();

            $expensesByCategory = Transaction::join('categories', 'transactions.category_id', '=', 'categories.category_id')
                ->where('transactions.user_id', $userId)
                ->where('transactions.type', 'expense')
                ->whereMonth('transactions.date', $now->month)
                ->whereYear('transactions.date', $now->year)
                ->select('categories.name', DB::raw('SUM(transactions.amount) as total'))
                ->groupBy('categories.name')
                ->orderByDesc(DB::raw('SUM(transactions.amount)'))
                ->get();

            return response()->json([
                'by_category' => $expensesByCategory->map(fn($item) => [
                    'name' => $item->name,
                    'total' => (float) $item->total
                ]),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getSavingsDashboard(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['error' => 'Unauthenticated'], 401);
            }

            $userId = $user->user_id;

            $historicalSavings = Transaction::where('user_id', $userId)
                ->where('date', '>=', Carbon::now()->startOfMonth()->subMonths(5))
                ->selectRaw("
                    EXTRACT(MONTH FROM date)::int as month_num,
                    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
                    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
                ")
                ->groupBy('month_num')
                ->orderBy('month_num')
                ->get();

            return response()->json([
                'savings_trend' => $historicalSavings->map(function ($item) {

                    $monthNumber = (int) $item->month_num;

                    return [
                        'month' => Carbon::create()->month($monthNumber)->format('M'),
                        'savings' => (float) ($item->income - $item->expense),
                        'income' => (float) $item->income,
                        'expense' => (float) $item->expense,
                        'savings_rate' => $item->income > 0
                            ? round((($item->income - $item->expense) / $item->income) * 100, 2)
                            : 0
                    ];
                })
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}