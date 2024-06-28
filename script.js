// Initialize Visualization
function initializeVisualization(data) {
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", 500);

  drawSquare(svg, data, 300, 50, 100, getColor(data.class), data.depth);
}

// Draw Squares Recursive Function
function drawSquare(svg, square, x, y, size, color, depth) {
  const iconClass = {
    root: 'fa-home',
    branch: 'fa-tree',
    leaf: 'fa-leaf',
    fruit: 'fa-apple-alt'
  };

  svg.append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("width", size)
    .attr("height", size)
    .attr("fill", color)
    .attr("opacity", square.included ? 1 : 0.3)
    .attr("rx", 4)
    .attr("ry", 4)
    .on("click", function () {
      showSquareModal(square);
    });

  svg.append('text')
    .attr('x', x + size / 4)
    .attr('y', y + size / 2 + 5)
    .attr('font-family', 'Font Awesome 5 Free')
    .attr('class', `fa ${iconClass[square.class]}`)
    .attr('font-size', '24px')
    .attr('fill', '#333');

  if (square.children) {
    const childSize = size / 2;
    const childSpacing = size / 3;
    let childX = x + size / 2 - (square.children.length * (childSize + childSpacing)) / 2;
    let childY = y + size + childSpacing;

    for (const child of square.children) {
      drawSquare(svg, child, childX, childY, childSize, getColor(child.class), depth + 1);
      childX += childSize + childSpacing;
    }
  }
}

// Helper function to get color based on class
function getColor(className) {
  const colors = {
    root: "lightblue",
    branch: "lightgray",
    leaf: "lightgreen",
    fruit: "lightcoral"
  };
  return colors[className] || "lightgrey";
}

// Show Square Modal
function showSquareModal(square) {
  const modal = document.getElementById("myModal");
  const modalText = document.getElementById("modal-text");
  const labelInput = document.getElementById("label-input");
  const saveButton = document.getElementById("save-label");

  modal.style.display = "block";
  modalText.innerText = `Edit Square: ${square.title}`;
  labelInput.value = square.title;

  saveButton.onclick = function () {
    square.title = labelInput.value;
    closeModal();
    initializeVisualization(data); // Re-render the visualization
  };

  document.getElementById("cancel").onclick = function () {
    closeModal();
  };
}

// Close Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// View Scope
document.getElementById('view-scope').onclick = function () {
  const selectedClass = prompt("Enter class to filter (e.g., leaf, fruit):");
  const filteredData = filterSquares(squareData, selectedClass);
  initializeVisualization(filteredData); // Re-render with filtered data
};

// Filter Squares
function filterSquares(data, className) {
  const filterRecursive = (data) => {
    if (data.class === className) {
      return data;
    }
    if (data.children) {
      data.children = data.children.map(filterRecursive).filter(Boolean);
      return data.children.length ? data : null;
    }
    return null;
  };
  return filterRecursive(data);
}

// View Scale
document.getElementById('view-scale').onclick = function () {
  const zoomScale = 2;
  const svg = d3.select("svg");
  const translateX = svg.attr("width") / 2;
  const translateY = svg.attr("height") / 2;

  svg.transition()
    .duration(300)
    .attr("transform", `translate(${translateX}, ${translateY}) scale(${zoomScale})`);
};

// Include/Exclude Toggle
document.getElementById('include').onclick = function () {
  const square = currentSquare;
  square.included = !square.included;
  initializeVisualization(data); // Re-render the visualization
};

// Save Data
function saveData() {
  if (squareData) {
    localStorage.setItem("squareData", JSON.stringify(squareData));
  } else {
    console.error("No data to save");
  }
}
window.addEventListener("beforeunload", saveData);

// Load Data
function loadData() {
  const storedData = localStorage.getItem("squareData");
  if (storedData) {
    try {
      squareData = JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing stored data:", error);
      squareData = {};
    }
  } else {
    squareData = {};
  }
}
window.addEventListener("load", loadData);

// Initialize visualization on page load
window.addEventListener("load", function () {
  initializeVisualization(squareData);
});

const svg = d3.select("#chart");

const width = window.innerWidth * 0.9;
const height = window.innerHeight * 0.9;
const centerX = width / 2;
const centerY = height / 2;
const centerSquareSize = Math.min(width, height) / 2;
const smallSquareSize = centerSquareSize / 2;
const smallestSquareSize = smallSquareSize / 2;
const tinySquareSize = smallestSquareSize / 2;

svg
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

const modal = document.getElementById("myModal");
const modalText = document.getElementById("modal-text");
const btnClose = document.getElementsByClassName("close")[0];
const btnSaveLabel = document.getElementById("save-label");
const btnViewScale = document.getElementById("view-scale");
const btnViewScope = document.getElementById("view-scope");
const btnInclude = document.getElementById("include");
const btnCancel = document.getElementById("cancel");
const labelInput = document.getElementById("label-input");

let currentUrl = "";
let currentTextElement = null;
let currentSquareClass = "";

// Function to get colors based on class name
function getColor(className) {
  const colors = {
    root: "#1E90FF",
    branch: "#FF6347",
    leaf: "#32CD32",
    fruit: "lightcoral"
  };
  return colors[className] || "lightgrey";
}

// Function to draw squares
function drawSquare(x, y, size, color, className, depth, parentText) {
  const rect = svg
    .append("rect")
    .attr("x", x - size / 2)
    .attr("y", y - size / 2)
    .attr("width", size)
    .attr("height", size)
    .attr("class", `square ${className}`)
    .attr("fill", color)
    .on("click", debounce(function () {
      const url = `pages/scoped_page_${parentText}_${depth}_${className}.html`;
      const textElement = d3.select(this.nextSibling);
      openModal(url, className, textElement.node());
    }, 200));

  const text = svg
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .attr("font-size", size / 5)
    .attr("pointer-events", "none")
    .text(className);
}

// Function to initialize the visualization
function initializeVisualization(data) {
  drawSquare(centerX, centerY, centerSquareSize, "lightblue", "root", 1, "Center");

  const corners = [
    [centerX - centerSquareSize / 2, centerY - centerSquareSize / 2], // top-left
    [centerX + centerSquareSize / 2, centerY - centerSquareSize / 2], // top-right
    [centerX - centerSquareSize / 2, centerY + centerSquareSize / 2], // bottom-left
    [centerX + centerSquareSize / 2, centerY + centerSquareSize / 2], // bottom-right
  ];

  drawSquares(corners, smallSquareSize, 1, "root", "Root");
}

// Draw the squares in each layer
function drawSquares(corners, size, depth, className, parentText) {
  if (depth > 3) return; // Limit the depth for better performance

  const colors = {
    root: "lightblue",
    branch: "lightgray",
    leaf: "lightgreen",
    fruit: "lightcoral",
  };

  corners.forEach(([x, y], index) => {
    let currentClassName;
    if (depth === 1) {
      currentClassName = "branch";
    } else if (depth === 2) {
      currentClassName = "leaf";
    } else if (depth === 3) {
      currentClassName = "fruit";
    }

    drawSquare(
      x,
      y,
      size,
      colors[currentClassName] || "",
      currentClassName || "",
      depth,
      parentText
    );

    if (size > tinySquareSize) {
      const nextSize = size / 2;
      const nextCorners = [
        [x - size / 2, y - size / 2], // top-left
        [x + size / 2, y - size / 2], // top-right
        [x - size / 2, y + size / 2], // bottom-left
        [x + size / 2, y + size / 2], // bottom-right
      ];

      requestAnimationFrame(() => {
        drawSquares(
          nextCorners,
          nextSize,
          depth + 1,
          currentClassName || "",
          `${parentText}_${index + 1}`
        );
      });
    }
  });
}

// Function to open the modal
function openModal(url, className, textElement) {
  modal.style.display = "flex";
  currentUrl = url;
  currentTextElement = textElement;
  currentSquareClass = className;
  labelInput.value = textElement.textContent;
  modalText.textContent = `Square ${className} clicked! Edit Label:`;
}

// When the user clicks on <span> (x), close the modal
btnClose.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// When the user clicks on save label
btnSaveLabel.onclick = function () {
  if (currentTextElement) {
    currentTextElement.textContent = labelInput.value;
  }
  modal.style.display = "none";
};

// When the user clicks on view scale or view scope
btnViewScale.onclick = function () {
  const zoomScale = 2;
  const svg = d3.select("svg");
  const translateX = svg.attr("width") / 2;
  const translateY = svg.attr("height") / 2;

  svg.transition()
    .duration(300)
    .attr("transform", `translate(${translateX}, ${translateY}) scale(${zoomScale})`);
};

btnViewScope.onclick = function () {
  const selectedClass = prompt("Enter class to filter (e.g., leaf, fruit):");
  const filteredData = filterSquares(data, selectedClass);
  svg.selectAll("*").remove(); // Clear previous svg
  initializeVisualization(filteredData);
};

btnInclude.onclick = function () {
  window.location.href = `included_build.html?class=${currentSquareClass}&parent=${currentTextElement.textContent}`;
};

btnCancel.onclick = function () {
  modal.style.display = "none";
};

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Function to adjust fruit opacity on leaf hover
function adjustFruitOpacityOnLeafHover() {
  const leafSquares = document.querySelectorAll('.leaf');
  const fruitSquares = document.querySelectorAll('.fruit');

  leafSquares.forEach(leaf => {
    leaf.addEventListener('mouseover', () => {
      fruitSquares.forEach(fruit => {
        fruit.style.opacity = '1'; // Set fruit opacity to full on leaf hover
      });
    });

    leaf.addEventListener('mouseout', () => {
      fruitSquares.forEach(fruit => {
        fruit.style.opacity = '0.3'; // Revert fruit opacity on mouse out
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const btnSaveLabel = document.getElementById("save-label");

  if (btnSaveLabel) {
    btnSaveLabel.addEventListener('click', function () {
      const labelValue = document.getElementById("label-input").value;
      const squareData = {
        class: 'fruit',
        parent: 'leaf',
        depth: 2,
        title: labelValue, // Assuming you want to save the input as the title
      };
      console.log("Saving data:", squareData);
      // Call saveSquareData to actually save the data
      saveSquareData(squareData);
    });
  } else {
    console.log("Save button not found");
  }
});

function saveSquareData(squareData) {
  fetch('/save_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(squareData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getSquareData(squareClass, parent, depth) {
  fetch(`/get_data?class=${encodeURIComponent(squareClass)}&parent=${encodeURIComponent(parent)}&depth=${encodeURIComponent(depth)}`)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Process the data
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

adjustFruitOpacityOnLeafHover();

// Load and initialize visualization
window.addEventListener("load", function () {
  loadData();
  initializeVisualization(data);
});

// Save the current state of the data
function saveData() {
  if (data) {
    localStorage.setItem("squareData", JSON.stringify(data));
  } else {
    console.error("No data to save");
  }
}

window.addEventListener("beforeunload", saveData);

// Load the saved state of the data
function loadData() {
  const storedData = localStorage.getItem("squareData");
  if (storedData) {
    try {
      window.squareData = JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing stored data:", error);
      window.squareData = {};
    }
  } else {
    window.squareData = {};
  }
}
