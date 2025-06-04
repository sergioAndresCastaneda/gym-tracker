import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function Dashboard({ records }) {
  // Procesamiento de datos para ECharts
  const { totalWeight, monthlyData, exerciseData, progressData } = useMemo(() => {
    const exerciseMap = {};
    const monthlyMap = {};
    let totalWeight = 0;
    
    records.forEach(r => {
      const date = new Date(r.date);
      const monthKey = format(date, 'MMMM yyyy', { locale: es });
      
      // Para totales por ejercicio
      if (!exerciseMap[r.exercise]) {
        exerciseMap[r.exercise] = { 
          sets: 0, 
          reps: 0, 
          weight: 0,
          maxWeight: 0
        };
      }
      
      // Para evolución mensual
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { 
          weight: 0,
          reps: 0,
          exercises: new Set()
        };
      }
      
      const weight = Number(r.weight) * Number(r.reps) * Number(r.sets);
      
      exerciseMap[r.exercise].sets += Number(r.sets);
      exerciseMap[r.exercise].reps += Number(r.reps) * Number(r.sets);
      exerciseMap[r.exercise].weight += weight;
      exerciseMap[r.exercise].maxWeight = Math.max(exerciseMap[r.exercise].maxWeight, r.weight);
      
      monthlyMap[monthKey].weight += weight;
      monthlyMap[monthKey].reps += Number(r.reps) * Number(r.sets);
      monthlyMap[monthKey].exercises.add(r.exercise);
      
      totalWeight += weight;
    });
    
    // Preparar datos para gráficos
    const exerciseData = Object.keys(exerciseMap).map(ex => ({
      name: ex,
      value: exerciseMap[ex].weight,
      maxWeight: exerciseMap[ex].maxWeight
    }));
    
    const monthlyData = Object.keys(monthlyMap).map(month => ({
      month,
      weight: monthlyMap[month].weight,
      reps: monthlyMap[month].reps,
      exercises: monthlyMap[month].exercises.size
    }));
    
    const progressData = Object.keys(exerciseMap).map(ex => ({
      name: ex,
      data: records
        .filter(r => r.exercise === ex)
        .map(r => [new Date(r.date).getTime(), Number(r.weight)])
        .sort((a, b) => a[0] - b[0])
    }));
    
    return { totalWeight, monthlyData, exerciseData, progressData };
  }, [records]);

  // Opciones para los gráficos de ECharts
  const getBarChartOptions = () => ({
    title: { text: 'Peso por ejercicio', left: 'center' },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: params => {
        const data = params[0].data;
        return `${data.name}<br/>
          Peso total: <b>${data.value} kg</b><br/>
          Máximo peso: <b>${data.maxWeight} kg</b>`;
      }
    },
    xAxis: { type: 'category', data: exerciseData.map(d => d.name) },
    yAxis: { type: 'value', name: 'Kg' },
    series: [{
      data: exerciseData.map(d => d.value),
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#6a82fb' },
          { offset: 1, color: '#fc5c7d' }
        ])
      }
    }]
  });

  const getPieChartOptions = () => ({
    title: { text: 'Distribución de ejercicios', left: 'center' },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} kg ({d}%)'
    },
    series: [{
      name: 'Peso levantado',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      label: { show: true, formatter: '{b}: {d}%' },
      emphasis: {
        label: { show: true, fontSize: '18', fontWeight: 'bold' }
      },
      data: exerciseData
    }]
  });

  const getLineChartOptions = () => ({
    title: { text: 'Evolución de peso por ejercicio', left: 'center' },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        const date = format(new Date(Number(params[0].value[0])), 'PPP', { locale: es });
        return `${params[0].seriesName}<br/>
          ${date}: <b>${params[0].value[1]} kg</b>`;
      }
    },
    xAxis: { type: 'time' },
    yAxis: { type: 'value', name: 'Kg' },
    series: progressData.map(ex => ({
      name: ex.name,
      type: 'line',
      showSymbol: true,
      data: ex.data
    }))
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#3b3b6d' }}>Dashboard de Progreso</h2>
      
      <div style={{ 
        background: '#6a82fb10', 
        padding: '1.5rem', 
        borderRadius: 16,
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h3 style={{ marginTop: 0 }}>Peso total levantado este mes</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fc5c7d' }}>
          {totalWeight.toLocaleString('es-ES')} kg
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '1rem', boxShadow: '0 2px 16px #0001' }}>
          <ReactECharts option={getBarChartOptions()} style={{ height: '400px' }} />
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: '1rem', boxShadow: '0 2px 16px #0001' }}>
          <ReactECharts option={getPieChartOptions()} style={{ height: '400px' }} />
        </div>
      </div>
      
      <div style={{ background: '#fff', borderRadius: 16, padding: '1rem', boxShadow: '0 2px 16px #0001' }}>
        <ReactECharts option={getLineChartOptions()} style={{ height: '500px' }} />
      </div>
    </div>
  );
}

export default Dashboard;
