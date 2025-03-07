import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ForecastData } from '@/api/types';
import { format } from 'date-fns';

interface HourlyForecastProps {
  data: ForecastData;
}

type AreaLabelType = {
  index: number;
  x: number;
  y: number;
  value: number;
};

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  const chartData = data.list.slice(0, 8).map((item, index) => ({
    time: index === 0 ? 'Now' : format(new Date(item.dt * 1000), 'ha'),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
    rain: item.rain?.['3h'] || 0,
  }));

  return (
    <div className='min-h-40 w-full xl:order-3 lg:order-2 md:order-3 xl:col-span-2 lg:col-span-1 md:col-span-2'>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id='tempGradient' x1='0' y1='1' x2='0' y2='0'>
              <stop offset='0%' stopColor='#66b3ff' />
              <stop offset='100%' stopColor='#ffff66' />
            </linearGradient>
          </defs>
          <XAxis
            dataKey='time'
            stroke='#888888'
            fontSize={12}
            orientation='top'
            padding={{ left: 10 }}
            height={15}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke='#888888'
            fontSize={12}
            padding={{ top: 10 }}
            width={25}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const [temp, feels_like] = payload;
                return (
                  <div className='rounded-md border bg-background p-2 shadow-sm'>
                    <div className='flex gap-2'>
                      <div className='flex flex-col'>
                        <span className='text-xs text-muted-foreground'>
                          temperature
                        </span>
                        <span>{temp.value}°</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-xs text-muted-foreground'>
                          feels like
                        </span>
                        <span className='text-sm'>{feels_like.value}°</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type='monotone'
            dataKey='rain'
            stroke='none'
            fill='#66b3ff'
            label={({ index, x, y, value }: AreaLabelType) =>
              index === 0 ? null : value > 0 ? (
                <text
                  x={x}
                  y={y}
                  dy={-10}
                  fill='#888888'
                  fontSize={12}
                  textAnchor='end'
                >
                  {value.toFixed(1)} mm
                </text>
              ) : null
            }
          />
          <Line
            type='monotone'
            dataKey='temp'
            stroke='url(#tempGradient)'
            strokeWidth={2}
            dot={false}
          />
          <Line
            type='monotone'
            dataKey='feels_like'
            stroke='#64748b'
            strokeWidth={2}
            dot={false}
            strokeDasharray='6 3'
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default HourlyForecast;
