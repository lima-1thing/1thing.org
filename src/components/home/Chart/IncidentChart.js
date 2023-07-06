import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import {
  ComposedChart,
  Area,
  Bar,
  Legend,
  AreaChart,
  ReferenceLine,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import "./IncidentChart.css";

const IncidentChart = ({ color, chart_data, state, isFirstLoadData }) => {
  const formatXAxis = (tickVal) => {
    //yyyy-mm-dd to mm/year, e.g. 2020-01-01 to Jan 2020
    const d = moment(tickVal, "YYYY-MM-DD");
    return d.format("MMM' YY");
  };
  
  const { t } = useTranslation();
  const [xticks, setXTicks] = useState([]);
  const [totalCases, setTotalCases] = useState(0);
  const [tooltip, setTooltip] = useState(); //decide which tooltip to show
  useEffect(() => {
    const newXTicks = [];
    let total = 0;
    for (let i = 0; i < chart_data.length; i++) {
      total += chart_data[i].value;
      const d = moment(chart_data[i].key, "YYYY-MM-DD");
      //if total dates>6M, show ticks at first day of each month
      //if between 3M-6M show on 15th of each month too
      //if <3M, show 8th, 22nd too
      switch (d.date()) {
        case 1:
          newXTicks.push(chart_data[i].key);
          break;
        case 15:
          if (chart_data.length <= 180) {
            newXTicks.push(chart_data[i].key);
          }
          break;
        case 8:
        case 22:
          if (chart_data.length <= 90) {
            newXTicks.push(chart_data[i].key);
          }
          break;
      }
    }
    setXTicks(newXTicks);
    setTotalCases(total);
  }, [chart_data]);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload[0] && payload[0].value) {
      const d = moment(payload[0].payload.key, "YYYY-MM-DD");
      const monthly = payload[0].payload.monthly_cases;
      const daily = payload[0].payload.value ? payload[0].payload.value : 0;
      return tooltip !== "daily" ? (
        <div className="recharts-custom-tooltip">
          <p className="date">{d.format("MMM YYYY")}</p>
          <p className="cases">
            <strong>
              {t("incident_chart.total_monthly_cases", { count: monthly })}
            </strong>
          </p>
        </div>
      ) : (
        <div className="recharts-custom-tooltip">
          <p className="date">{d.format("M/D/YYYY")}</p>
          <p className="cases">
            <strong>
              {t("incident_chart.total_daily_cases", { count: daily })}
            </strong>
          </p>
          <p className="cases">
            <strong>
              {t("incident_chart.total_monthly_cases", { count: monthly })}
            </strong>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="recharts-wrapper">
      {totalCases === 0 && !isFirstLoadData ? (
        <>
          <p className="add-data-button">
            <Trans i18nKey="no_data_please_report">
              There is no data collected in the selected location and date range
              yet. Please click
              <a
                href="https://forms.gle/HRkVKW2Sfp7BytXj8"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              to report incidents to us.
            </Trans>
          </p>
          <div className="drop-down" />
        </>
      ) : null}

      <ResponsiveContainer>
      <ComposedChart 
            height={300}
            data={chart_data} 
            margin={{ top: 30, right: 30, bottom: 10, left: -30 }}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)"
          }}>
            
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis
            dataKey="key"
            tickFormatter={formatXAxis}
            interval="preserveStartEnd"
            ticks={xticks}
             minTickGap={1}
            tick={{
              fontSize: '12px',
              fontFamily: 'sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '16px',
              textAlign: 'center',
              letterSpacing: '0.4px',
              fill: '#F4F4F4',
            }}
            axisLine={{ stroke: "#FFFFFF", strokeWidth: 2 }}
            
          />
          <YAxis
            allowDecimals={false}
            orientation="left"
            interval="preserveStartEnd"
            type="number"
            domain={[0, "dataMax + 3"]}
            axisLine={{ stroke: "#FFFFFF", strokeWidth: 2 }}
            
          />
          <YAxis
            hide={true}
            yAxisId="right"
            orientation="right"
            allowDecimals={false}
            interval="preserveStartEnd"
            
            
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            name={t("monthly_count")}
            type="monotone"
            dataKey="monthly_cases"
            fill="url(#monthly-gradient)"
            stroke="#FFE033"
            strokeWidth={4}
            yAxisId="right"
            onMouseOver={() => setTooltip("monthly")}
          />
          <defs>
            <linearGradient id="monthly-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FFE033" />
              <stop offset="100%" stop-color="rgba(255, 224, 51, 0)" />
            </linearGradient>
          </defs>

        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default IncidentChart;