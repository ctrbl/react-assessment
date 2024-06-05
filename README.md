# Product Card Demo

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Component Implementation

The ProductCard component is a functional component that accepts 'image', 'name', 'price', and 'description' as required props. It uses these props to display the product information. 

For the product card component, I applied basic CSS styling as defined in the 'ProductCard.css' file. The styling ensures that the component is visually appealing with proper spacing and hover effects, while keeping it simple. The card's background is transparent, so the component seamlessly integrates with different backgrounds. The "Buy Now" button also has a simple click effect to ensure a seamless user experience. When clicked, it will log the product's name and price to the console. 

The product image will be displayed as a square image within the container (maintaining a fixed aspect ratio regardless of its original dimensions). This will ensure a consistent and uniform format when using multiple ProductCard components. 

## Error Handling and Edge Cases

The component uses PropTypes to ensure that the correct data types are passed as props. If any required prop is missing or has an incorrect type, a warning will be shown in the console during development. For a more robust implementation, we could define the default values for props that are optional (i.e., like empty string for product's description), instead of requiring all props. 

In the case that a prop is missing, we can check within the component if the required props are present. If not, we can render a placeholder or error message. For example, if the product image's URL is broken, we can render a default sample image. 

```
  if (!image || !name || !price) {
    return <div>Error: Required props not provided</div>;
  }

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150"; // Default placeholder image
  };

```

In the case of incorrect data types, we can perform type checking on the props using JavaScript (using typeof). If a prop has an incorrect data type, we can either provide a default value (i.e., description could have an empty string as default value), cast the prop to the correct data type (i.e., cast to make sure the price is number), or render an error message when an important prop is missing (i.e., in case no price or product name is given). 

```
  // If anything wrong with description, use empty string as default
  if (!description || typeof description !== 'string') {
    description = ""; 
  }

  // Cast type for price 
  if (typeof price !== 'number') {
    price = parseFloat(price); 
  }

  if (typeof name !== 'string' || typeof image !== 'string') {
    return <div>Error: Incorrect data types for props</div>;
  }
```

Note: I'm just returning a simple div with the error message for simplicity, but we can implement other ways to show the error message. 

Edge cases that need to be considered are:
- Invalid image URL: If the image URL is broken, the 'img' element will fail to load the image. We could add an 'onError' handler to replace the broken image with a default placeholder value.

- Negative price: We should ensure to handle any unexpected negative values given to the product price. 

- Long texts: If the name or description is too long, it could break the layout. We could use CSS to handle text overflow by truncating long texts to fit the layout and provide a consistent size. 

```
  /* Limit product name to one line with ellipsis */
  .product-name {
    font-size: 1.05em;
    margin: 12px 0 4px 0;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }

  /* Limit product description to 3 lines with ellipsis */
  .product-description {
    font-size: 0.6em;
    margin: 4px 0 24px 0; 
    overflow: hidden; 
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical; 
  }
```

## Portfolio Component

### Purpose 

In my portfolio, the Portfolio component is designed to showcase a gallery of projects with their titles, descriptions, and associated tags. It utilizes a grid layout to present the projects in an organized and visually appealing manner. 

### Props

The 'projects' prop is expected to be passed when using the component. This prop is an array containing objects, where each object represents a project to be displayed in the portfolio gallery. 

The 'projects' prop is defined as an array of objects using 'PropTypes.arrayOf()' with the shape of each object specified using 'PropTypes.shape()'.

Each object within the 'projects' array should have the following properties: imageUrl, thumbnailUrl, title, description, and tags. All are required strings, except for tags (which is an array of strings). 

```
  Portfolio.propTypes = {
      projects: PropTypes.arrayOf(PropTypes.shape({
          imageUrl: PropTypes.string.isRequired,
          thumbnailUrl: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          tags: PropTypes.arrayOf(PropTypes.string).isRequired
      })).isRequired
  };
```

### State Management

The Portfolio component utilizes the 'useState' hook to manage the width state, which represents the current width of the browser window. This state is updated dynamically using the 'window.innerWidth' property whenever the window is resized. The 'useEffect' hook is used to add and remove a resize event listener to update the 'width ' state accordingly. If the width is below a certain threshold, the grid layout will change to a single column instead of the two-column layout. Moreover, the alternating color tags for each component will stop if the width is below the threshold. 

```
  const [width, setWidth] = useState(window.innerWidth); 

  useEffect(() => {
      const handleResize = () => {
          setWidth(window.innerWidth); 
      };
      
      window.addEventListener('resize', handleResize); 

      return () => {
          window.removeEventListener('resize', handleResize); 
      }; 
  }, []);
```

### Design Decisions and Optimizations:

For a responsive design that changes dynamically based on the browser window's width, the component adjusts its column layout and tag coloring. The dynamic tag coloring placements (depending on the browser's current light/dark theme) is determined using: 
```
function isOpposite(index, width) {
    return (index % 4 === 1 || index % 4 === 2) && width >= 768;
}
```

The component incorporates CSS animations ('animate-in-up', 'animate-card-2') to add subtle visual effects when elements enter the viewport, enhancing the user experience. I use PhotoSwipe for the responsive image gallery. 

The component includes proper HTML semantics ('itemScope', 'itemType', 'itemProp') and alt attributes for images to ensure accessibility and improve SEO. 

### Challenges and Solutions

One challenge I faced was dynamically determining the tags colors based on the index of the project in the projects array and the window width. If you notice, when in full screen, the tags of each project alternate colors (starting from the default theme color of your browswer). This was addressed by implementing the isOpposite function, which determines if the tags of the project should be colored black or white. When resizing the browser to tablet size (< 768 pixels), the portfolio will use a one-column layout and the alternating colors of the tags will not be used, only use a uniform color for a more consistent UX.
