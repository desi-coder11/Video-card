import { createSlice, nanoid, } from '@reduxjs/toolkit'

const initialState = {
    buckets: [
        {
            id: nanoid(),
            name: "Environment",
            cards: [
                {
                    id: nanoid(),
                    title: "card1",
                    // link: "https://youtube.com/embed/cV2gBU6hKfY"
                    link:"https://www.youtube.com/embed/jAa58N4Jlos"
                }
            ]
            
        },
        {
            id: nanoid(),
            name: "School",
            cards: [
                {
                    id: nanoid(),
                    title: "card1",
                    link: "https://www.youtube.com/embed/siffHLr7nx8"
                }
            ]
        },
        {
            id: nanoid(),
            name: "Education",
            cards: [
                {
                    id: nanoid(),
                    title: "card1",
                    link: "https://www.youtube.com/embed/54WlAFzBf-I"
                },
                {
                    id: nanoid(),
                    title: "card2",
                    link: "https://www.youtube.com/embed/UVL6hzTvzvE"
                },
                {
                    id: nanoid(),
                    title: "card3",
                    link: "https://www.youtube.com/embed/H9IhghhJPnA"
                },

            ]
        },
        {
            name: "Songs",
            id: nanoid(),
            cards: [
                {
                    id: nanoid(),
                    title: "Song1",
                    link: "https://www.youtube.com/embed/BddP6PYo2gs"
                },
                {
                    id: nanoid(),
                    title: "Song2",
                    link: "https://www.youtube.com/embed/sAzlWScHTc4"
                },
            ]
        }

    ],
}

export const bucketSlice = createSlice({
    name: "buckets",
    initialState,
    reducers: {
        editBucketName: {
            reducer(state, action) {
                const { editedName, id } = action.payload
                const foundBucket = state.buckets.find(bucket => bucket.id === id)
                if (foundBucket) {
                    foundBucket.name = editedName
                }
            }
        },
        deleteBucket: {
            reducer(state, action) {
                const { index } = action.payload
                state.buckets.splice(index, 1);
            }
        },
        addBucket: {
            reducer(state, action) {
                state.buckets.unshift({
                    name: "new bucket",
                    id: nanoid(),
                    cards: [],
                    initialEdit: true,
                })
            }
        },
        addCard: {
            reducer(state, action) {
                const { bucketIndex, title, link } = action.payload;
                const newCard = {
                    id: nanoid(),
                    title,
                    link,
                }

                const foundBucket = state.buckets.find((bucket, index) => index === bucketIndex)
                foundBucket.cards.unshift(newCard)
            }
        },
        updateCard: {
            reducer(state, action) {
                const { title, link, bucketIndex, cardIndex } = action.payload
                const foundBucket = state.buckets.find((bucket, index) => index === bucketIndex)
                const foundCard = foundBucket.cards[cardIndex]
                foundCard.title = title;
                foundCard.link = link;
            }
        },
        deleteCard: {
            reducer(state, action) {
                const { bucketIndex, cardIndex } = action.payload
                console.log(action.payload, "deelele");
                state.buckets[bucketIndex].cards.splice(cardIndex, 1);
            }
        },
        toggleInitialEditValue: {
            reducer(state, action) {
                const { index } = action.payload
                const val = state.buckets[index].initialEdit;
                if (val !== undefined) {
                    state.buckets[index].initialEdit = false;
                }
            }
        }
    }
})

export const allBuckets = (state) => state.buckets.buckets
export const { editBucketName, addCard, updateCard, deleteBucket, addBucket, deleteCard, toggleInitialEditValue } = bucketSlice.actions

export default bucketSlice.reducer