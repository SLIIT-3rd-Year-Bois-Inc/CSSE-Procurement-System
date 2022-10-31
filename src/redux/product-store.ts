import { createSlice } from "@reduxjs/toolkit";

const selectProductSlice = createSlice({
    name: "product",
    initialState: {
        selected: {
            id: "",
            active: false,
        },
        draft: {
            items: {}
        }
    },

    reducers: {
        selectCurrentProduct(state, action) {
            state.selected.id = action.payload.id
            state.selected.active = true;
        },
        setActive(state, action) {
            state.selected.active = !!action.payload;
        },
        updatePOdraft(state, action) {
            let new_state = {...action.payload};
            state.draft = new_state;
        },
        addToItems(state, action) {
            let payload = action.payload;
            let current_item: any = (state.draft.items as any)[payload.id];

            if(!current_item) {
                (state.draft.items as any)[payload.id] = {};
                (state.draft.items as any)[payload.id].quantity = 1;
                return;
            }

            current_item.quantity++;
        }
    }
})

export const { selectCurrentProduct, setActive, addToItems, updatePOdraft } = selectProductSlice.actions;
export default selectProductSlice.reducer;