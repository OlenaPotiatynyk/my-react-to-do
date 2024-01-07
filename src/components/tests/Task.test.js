import {fireEvent, render, screen} from "@testing-library/react";
import Task from "../Task";
import {act} from "react-dom/test-utils";

let task = {
    'id': 'Z1704583857519',
    'completed': false,
    'text': 'perform testing'
}
let competedTask = {
    id: 'Z1704583857520',
    completed: true,
    text: 'design'
};

describe('Task component in non-edit mode', () => {
    it('renders unchecked checkbox for not completed task', () => {
        render(<Task task={task}/>);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
    it('renders checked checkbox for completed task', () => {
        render(<Task task={competedTask}/>);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeChecked();
    });
    it('renders task text', () => {
        render(<Task task={task}/>);
        expect(screen.getByRole('checkbox')).toHaveAccessibleName(task.text);
    });
    it('renders completed task text crossed out', () => {
        render(<Task task={competedTask}/>);
        expect(screen.getByRole('checkbox')).toHaveAccessibleName(competedTask.text);
        expect(screen.getByText(competedTask.text)).toHaveStyle('text-decoration: line-through');
    });
    it('renders delete button', () => {
        render(<Task task={task}/>);
        expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument();
    });
    it('renders edit button', () => {
        render(<Task task={task}/>);
        expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument();
    });
    it('renders "move to the top" button', () => {
        render(<Task task={task}/>);
        expect(screen.getByRole('button', {name: 'Move to the top'})).toBeInTheDocument();
    });
})
describe('Task component in edit mode', () => {
    it('renders text area', () => {
        render(<Task task={task}/>);

        act(() => {
            screen.getByRole('button', {name: 'Edit'}).click();
        })

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveAccessibleName('Edit');
        expect(screen.getByRole('textbox')).toHaveValue(task.text);
    });

    it('renders save button', () => {
        render(<Task task={task}/>);

        act(() => {
            screen.getByRole('button', {name: 'Edit'}).click();
        })

        expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument();
    });

    it('renders close button', () => {
        render(<Task task={task}/>);

        act(() => {
            screen.getByRole('button', {name: 'Edit'}).click();
        })

        expect(screen.getByRole('button', {name: 'Close'})).toBeInTheDocument();
    });
})

describe('Task Component edit', () => {
    const mockEdit = jest.fn();

    it('handles task update', () => {
        render(<Task task={task} edit={mockEdit}/>);

        act(() => {
            screen.getByRole('button', {name: 'Edit'}).click();
        })

        let textbox = screen.getByRole('textbox');
        fireEvent.change(textbox, {target: {value: 'New Value'}})

        act(() => {
            screen.getByRole('button', {name: 'Save'}).click();
        })

        expect(mockEdit).toBeCalledTimes(1);
        expect(mockEdit).toBeCalledWith('New Value');
    });

    it('does no update if Close button pressed', () => {
        render(<Task task={task} edit={mockEdit}/>);

        act(() => {
            screen.getByRole('button', {name: 'Edit'}).click();
        })

        let textbox = screen.getByRole('textbox');
        fireEvent.change(textbox, {target: {value: 'New Value'}})

        act(() => {
            screen.getByRole('button', {name: 'Close'}).click();
        })

        expect(mockEdit).toBeCalledTimes(0);
    });
})

test('Task Component handles task removal', () => {
    const mockRemove = jest.fn();
    render(<Task task={task} remove={mockRemove}/>);

    act(() => {
        screen.getByRole('button', {name: 'Delete'}).click();
    })

    expect(mockRemove).toBeCalledTimes(1);
});
test('Task Component handles task move up', () => {
    const mockMoveUp = jest.fn();
    render(<Task task={task} move_up={mockMoveUp}/>);

    act(() => {
        screen.getByRole('button', {name: 'Move to the top'}).click();
    })

    expect(mockMoveUp).toBeCalledTimes(1);
});
test('Task Component handles task completion', () => {
    const toggleTaskCheckedMock = jest.fn();
    render(<Task task={task} toggle_checked={toggleTaskCheckedMock}/>);

    act(() => {
        screen.getByRole('checkbox').click();
    })

    expect(toggleTaskCheckedMock).toBeCalledTimes(1);
});