import {render, screen} from '@testing-library/react';
import App from './App';
import {TodosProvider} from "./TodosProvider";
import TaskList from "./components/TaskList";

jest.mock('./components/TaskList');
test('has task list component', () => {
    render(
        <TodosProvider>
            <App/>
        </TodosProvider>
    );
    expect(TaskList).toHaveBeenCalled();
    expect(TaskList).toHaveBeenCalledTimes(1);
});
test('has correct heading', () => {
    render(
        <TodosProvider>
            <App/>
        </TodosProvider>
    );
    expect(screen.getByRole('heading')).toHaveTextContent('My Cozy To Do');
});