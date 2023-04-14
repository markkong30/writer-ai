'use client';

import { createTheme, ThemeProvider } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ApiRequest } from '@prisma/client';
import { format } from 'date-fns';
import { useTheme } from 'next-themes';
import { FC } from 'react';

type ModifiedRequestType<K extends keyof ApiRequest> = Omit<ApiRequest, K> & {
  timestamp: string;
};

interface TableProps {
  userRequests: ModifiedRequestType<'timestamp'>[];
}

const columns: GridColDef[] = [
  {
    field: 'col1',
    headerName: 'Your API keys',
    width: 400,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName} 🔑</strong>
      );
    },
  },
  {
    field: 'col2',
    headerName: 'Mode',
    width: 250,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      );
    },
  },
  {
    field: 'col3',
    headerName: 'Recency',
    type: 'date',
    valueGetter: params => new Date(params.value),
    valueFormatter: params => format(params.value, 'MMMM d, yyyy HH:mm:ss'),
    width: 250,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      );
    },
  },
  {
    field: 'col4',
    headerName: 'Duration',
    width: 150,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      );
    },
  },
  {
    field: 'col5',
    headerName: 'Status',
    width: 150,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      );
    },
  },
];

const Table: FC<TableProps> = ({ userRequests }) => {
  const { theme: applicationTheme } = useTheme();

  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === 'light' ? 'light' : 'dark',
    },
  });

  const rows = userRequests.map(request => ({
    id: request.id,
    col1: request.apiKeyId,
    col2: request.mode,
    col3: request.timestamp,
    col4: `${request.duration} ms`,
    col5: request.status,
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === 'light' ? 'white' : '#152238',
          fontSize: '1rem',
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
          sorting: {
            sortModel: [{ field: 'col3', sort: 'desc' }],
          },
        }}
        columns={columns}
        rows={rows}
      />
    </ThemeProvider>
  );
};

export default Table;
