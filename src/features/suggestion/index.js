import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSuggestion,
  selectError,
  selectLoading,
  selectSuggestion,
  // Task 18: Import the `selectSuggestion()` selector from the suggestion slice
} from './suggestion.slice';
import './suggestion.css';

export default function Suggestion() {
  // Task 19: Call useSelector() with the selectSuggestion() selector
  // The component needs to access the `imageUrl` and `caption` properties of the suggestion object.

  const suggestionData = useSelector(selectSuggestion);
  const { imageUrl, caption } = suggestionData.suggestion.data || {}; // using destructuring with a fallback in case suggestionData is null/undefined.
  //   const imageUrl = suggestionData.suggestion.data.imageUrl;
  //   const caption = suggestionData.suggestion.data.caption;
 console.log('suggestionData', suggestionData)
 // console.log(imageUrl)
 // console.log(caption)


  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadSuggestion() {
      // Task 20: Dispatch the fetchSuggestion() action creator
       await dispatch(fetchSuggestion());
    }
    loadSuggestion();
  }, [dispatch]);

    // useEffect(() => {
    //     console.log('insideUse');
    //     dispatch(fetchSuggestion());
    // }, [dispatch]);

  let render;
  if (loading) {
    render = <h3>Loading...</h3>;
  } else if (error) {
    render = <h3>Sorry, we're having trouble loading the suggestion.</h3>;
  } else {
    // Task 21: Enable the two JSX lines below needed to display the suggestion on the page
    render = (
      <>
        <img alt={caption} src={imageUrl} />
        <p>{imageUrl}</p>
      </>
    );
  }

  return (
    <section className="suggestion-container">
      <h2>Suggestion of the Day</h2>
      {render}
    </section>
  );
}
