import {render, screen} from "@testing-library/react";
import AddNewTask from "../AddNewTask";

describe('Component for adding new tasks', () => {
    it('renders input field', () => {
        render(<AddNewTask/>);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveAccessibleName('My outstanding task is...');
    });
    it('renders Add button', () => {
        render(<AddNewTask/>);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Add'})).toBeInTheDocument();
    });
})