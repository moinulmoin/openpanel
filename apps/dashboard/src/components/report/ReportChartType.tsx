import { useDispatch, useSelector } from '@/redux';
import {
  AreaChartIcon,
  ChartBarIcon,
  ChartColumnIncreasingIcon,
  ConeIcon,
  GaugeIcon,
  Globe2Icon,
  LineChartIcon,
  type LucideIcon,
  PieChartIcon,
  UsersIcon,
} from 'lucide-react';

import { chartTypes } from '@openpanel/constants';
import { objectToZodEnums } from '@openpanel/validation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils/cn';
import { Button } from '../ui/button';
import { changeChartType } from './reportSlice';

interface ReportChartTypeProps {
  className?: string;
}
export function ReportChartType({ className }: ReportChartTypeProps) {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.report.chartType);
  const items = objectToZodEnums(chartTypes).map((key) => ({
    label: chartTypes[key],
    value: key,
  }));

  const Icons: Record<keyof typeof chartTypes, LucideIcon> = {
    area: AreaChartIcon,
    bar: ChartBarIcon,
    pie: PieChartIcon,
    funnel: ((props) => (
      <ConeIcon className={cn('rotate-180', props.className)} />
    )) as LucideIcon,
    histogram: ChartColumnIncreasingIcon,
    linear: LineChartIcon,
    metric: GaugeIcon,
    retention: UsersIcon,
    map: Globe2Icon,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          icon={Icons[type]}
          className={cn('justify-start', className)}
        >
          {items.find((item) => item.value === type)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Available charts</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {items.map((item) => {
            const Icon = Icons[item.value];
            return (
              <DropdownMenuItem
                key={item.value}
                onClick={() => dispatch(changeChartType(item.value))}
              >
                {item.label}
                <DropdownMenuShortcut>
                  <Icon className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
