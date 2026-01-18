<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;


class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = Plan::all();
        return view('plans.index', compact('plans'));
     
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('plans.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'duration_days' => 'required|integer',
        ]);

        Plan::create($request->all());

        return redirect()->route('plans.index')->with('success','Plan created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $plan=Plan::where('id',$id)->findOrFail();
         return view('plans.edit', compact('plan'));
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
       $plan=Plan::where('id',$id)->findOrFail();
         return view('plans.edit', compact('plan'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $plan =Plan::where('id',$id)->get();
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'duration_days' => 'required|integer',
        ]);

        $plan->update($request->all());

        return redirect()->route('plans.index')->with('success','Plan updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $plan=Plan::Where('id',$id)->first();
        $plan->delete();
        return redirect()->route('plans.index')->with('success','Plan deleted.');
    }
}
