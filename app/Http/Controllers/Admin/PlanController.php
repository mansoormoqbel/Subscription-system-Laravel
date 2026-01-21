<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans=Plan::get();
        return inertia('admin/plan/plan', [
                'plans' => $plans,   
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/plan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


            $data = $request->validate([
                'name' => 'required|string|max:255',

                'price' => 'required|numeric|min:0',

                'duration_days' => 'required|integer|min:1',

                'description' => 'nullable|string',

                'is_active' => 'required|boolean',
            ]);

            Plan::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'duration_days' =>$data['duration_days'],
                'description'=>$data['description'],
                'is_active' => $data['is_active'],
            ]);

            return redirect()->route('admin.plans');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $plan =Plan::findOrFail($id);
       return inertia('admin/plan/EditPlan', [
        'plan' => $plan,
        ]);
    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        $plan=Plan::findOrFail($id);
        $data = $request->validate([
                'name' => 'required|string|max:255',

                'price' => 'required|numeric|min:0',

                'duration_days' => 'required|integer|min:1',

                'description' => 'nullable|string',

                'is_active' => 'required|boolean',
        ]);

        
        $plan->update($data);

        return redirect()->route('admin.plans');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $plan =Plan::findOrFail($id);
        $plan->delete();
        return redirect()->route('admin.plans');
    }
}
