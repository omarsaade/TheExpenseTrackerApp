import {createContext, useReducer} from 'react';

// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     description: 'A pair of shoes',
//     amount: 59.99,
//     date: new Date('2021-12-19'),
//   },
//   {
//     id: 'e2',
//     description: 'A pair of trousers',
//     amount: 89.29,
//     date: new Date('2022-01-05'),
//   },
//   {
//     id: 'e3',
//     description: 'Some bananas',
//     amount: 5.99,
//     date: new Date('2021-12-01'),
//   },
//   {
//     id: 'e4',
//     description: 'A book',
//     amount: 14.99,
//     date: new Date('2022-02-19'),
//   },
//   {
//     id: 'e5',
//     description: 'Another book',
//     amount: 18.59,
//     date: new Date('2022-02-18'),
//   },
//   {
//     id: 'e6',
//     description: 'A books',
//     amount: 14.99,
//     date: new Date('2023-04-23'),
//   },
//   {
//     id: 'e7',
//     description: 'Another books',
//     amount: 18.59,
//     date: new Date('2023-05-1'),
//   },
//   {
//     id: 'e8',
//     description: 'Another books',
//     amount: 18.59,
//     date: new Date('2023-04-30'),
//   },
// ];

// auto completion
export const ExpensesContext = createContext({
  expenses: [], // auto completion only
  addExpense: ({descrition, amount, date}) => {},
  setExpenses: expenses => {},
  deleteExpense: id => {},
  updateExpense: (id, {descrition, amount, date}) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // const id = new Date().toString() + Math.random().toString();
      // return [{...action.payload, id: id}, ...state];
      return [action.payload, ...state];

    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      // index
      const updatableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      // updated item in a immutable way
      const updatedItem = {...updatableExpense, ...action.payload.data};
      // get the overall array
      const updatedExpenses = [...state];
      // override the item
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      // the new array with one item updated
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  // const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function setExpenses(expenses) {
    dispatch({type: 'SET', payload: expenses});
  }

  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }

  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;

/*
This will actually result in an error for using non-serializable value in the state/action because we are using the date without stringfying it.
*/

/*
import { createSlice } from '@reduxjs/toolkit';
 
const expenseSlices = createSlice({
  name: 'expenses',
  initialState: {
    allExpenses: [
      {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19'),
      },
    ],
  },
 
   
 
  reducers: {
    addExpense: (state, action) => {
      state.allExpenses.push(action.payload.expense);
    },
    deleteExpense: (state, action) => {
      state.allExpenses = state.allExpenses.filter(
        (el) => el.id !== action.payload.id
      );
    },
    updateExpense: (state, action) => {
      const currentItem = state.allExpenses.find(
        (el) => el.id === action.payload.item.id
      );
      const index = state.allExpenses.indexOf(currentItem);
      const updatedItem = {
        item: item,
      };
      // this is possible cause we can mutate it in redux toolkit
      allExpenses[index] = updatedItem;
    },
  },
});
 
export const { addExpense, deleteExpense, updateExpense } =
  expenseSlices.actions;
 
export default expenseSlices.reducer;

*/
