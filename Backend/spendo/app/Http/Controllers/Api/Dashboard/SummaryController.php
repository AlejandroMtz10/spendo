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
        $userId = $request->user()->user_id;
        $now = Carbon::now();

        $monthTotals = Transaction::where('user_id', $userId)
            ->whereMonth('date', $now->month)
            ->whereYear('date', $now->year)
            ->selectRaw("
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
            ")
            ->first();

        return response()->json([
            'total_balance' => (float) Account::where('user_id', $userId)->sum('balance'),
            'month_income'  => (float) ($monthTotals->income ?? 0),
            'month_expense' => (float) ($monthTotals->expense ?? 0),
            'recent_transactions' => TransactionsResource::collection(
                $request->user()->transactions()->latest()->take(5)->get()
            )
        ]);
    }

    public function getExpenseAnalysis(Request $request)
    {
        $userId = $request->user()->user_id;
        $now = Carbon::now();

        $expensesByCategory = Transaction::where('transactions.user_id', $userId)
            ->where('transactions.type', 'expense')
            ->whereMonth('date', $now->month)
            ->join('categories', 'transactions.category_id', '=', 'categories.category_id')
            ->select('categories.name', DB::raw('SUM(transactions.amount) as total'))
            ->groupBy('categories.name')
            ->orderByDesc('total')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->name,
                    'total' => (float) $item->total
                ];
            });

        $lastMonth = Carbon::now()->subMonth();
        $lastMonthTotal = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->whereMonth('date', $lastMonth->month)
            ->whereYear('date', $lastMonth->year)
            ->sum('amount');

        return response()->json([
            'by_category' => $expensesByCategory,
            'comparison'  => [
                'current_month' => (float) $expensesByCategory->sum('total'),
                'last_month'    => (float) $lastMonthTotal,
            ]
        ]);
    }

    public function getSavingsDashboard(Request $request)
    {
        $userId = $request->user()->user_id;

        $historicalSavings = Transaction::where('user_id', $userId)
            ->selectRaw("
                TO_CHAR(date, 'Mon') as month,
                EXTRACT(MONTH FROM date) as month_num,
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
            ")
            ->where('date', '>=', Carbon::now()->subMonths(6))
            ->groupBy(DB::raw("TO_CHAR(date, 'Mon'), EXTRACT(MONTH FROM date)"))
            ->orderBy('month_num')
            ->get()
            ->map(function ($item) {
                $income = (float) $item->income;
                $expense = (float) $item->expense;
                $surplus = $income - $expense;

                return [
                    'month' => $item->month,
                    'savings' => (float) ($surplus > 0 ? $surplus : 0),
                    'savings_rate' => $income > 0 ? round(($surplus / $income) * 100, 2) : 0
                ];
            });

        return response()->json([
            'savings_trend' => $historicalSavings
        ]);
    }
}