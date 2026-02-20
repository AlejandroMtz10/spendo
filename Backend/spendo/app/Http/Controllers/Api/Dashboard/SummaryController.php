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
    /**
     * DASHBOARD PRINCIPAL: Resumen general de la situación actual.
     */
    public function getMainDashboard(Request $request){
        $userId = $request->user()->user_id;
        $now = Carbon::now();

        // Totales del mes actual
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
            // Reutilizacion de Resource para las últimas 5 transacciones
            'recent_transactions' => TransactionsResource::collection(
                $request->user()->transactions()->latest()->take(5)->get()
            )
        ]);
    }

    /**
     * ANÁLISIS DE GASTOS: En lo que se gaste el dinero del mes
     */
    public function getExpenseAnalysis(Request $request)
    {
        $userId = $request->user()->user_id;
        $now = Carbon::now();

        // Gastos por categoría para la gráfica (Mes actual)
        $expensesByCategory = Transaction::where('transactions.user_id', $userId)
            ->where('transactions.type', 'expense')
            ->whereMonth('date', $now->month)
            ->join('categories', 'transactions.category_id', '=', 'categories.category_id')
            ->select('categories.name', DB::raw('SUM(transactions.amount) as total'))
            ->groupBy('categories.name')
            ->orderByDesc('total')
            ->get();

        // Comparativa rápida: Total mes actual vs mes pasado
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

    /**
     * DASHBOARD DE AHORROS: Distribución y tasa de ahorro.
     */
    public function getSavingsDashboard(Request $request)
    {
        $userId = $request->user()->user_id;

        // Distribución por tipo de cuenta (Efectivo vs Banco vs Ahorro)
        $accountDistribution = Account::where('user_id', $userId)
            ->select('type', DB::raw('SUM(balance) as total'))
            ->groupBy('type')
            ->get();

        // Tasa de ahorro histórica (últimos 6 meses)
        // Fórmula: (Ingresos - Gastos) / Ingresos * 100
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
                $surplus = $item->income - $item->expense;
                return [
                    'month' => $item->month,
                    'savings' => (float) ($surplus > 0 ? $surplus : 0),
                    'savings_rate' => $item->income > 0 ? round(($surplus / $item->income) * 100, 2) : 0
                ];
            });

        return response()->json([
            'account_distribution' => $accountDistribution,
            'savings_trend'        => $historicalSavings
        ]);
    }
}