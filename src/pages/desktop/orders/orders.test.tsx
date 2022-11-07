import Orders from ".";
import React from 'react';
import { render, waitForElementToBeRemoved, screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient()
jest.setTimeout(30000);

it('renders the orders page', async () => {
    await queryClient.invalidateQueries();
    render(
        <QueryClientProvider client={queryClient}>
            <Orders />
        </QueryClientProvider>
    );
});


it('shows initial pending orders', async () => {
    await queryClient.invalidateQueries();
    render(
        <QueryClientProvider client={queryClient}>
            <Orders />
        </QueryClientProvider>
    );


    const loader = await screen.findByText("Querying the Orders");
    
    expect(loader).toBeTruthy();
    console.log(loader);

    await waitForElementToBeRemoved(loader, {
        timeout: 20000
    });

    const table = screen.getAllByRole('table');
    console.log(table);
})

