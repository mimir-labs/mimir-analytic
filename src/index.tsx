// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import moment from 'moment';
import { createRoot } from 'react-dom/client';

import Root from './Root';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);
moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<Root />);
