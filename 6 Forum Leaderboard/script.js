// URLs for fetching forum data and constructing links
const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json"; // JSON of latest forum topics
const forumTopicUrl = "https://forum.freecodecamp.org/t/"; // Base URL for individual forum topics
const forumCategoryUrl = "https://forum.freecodecamp.org/c/"; // Base URL for forum categories
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp"; // Base URL for user avatars

// Container element where the forum posts will be inserted
const postsContainer = document.getElementById("posts-container");

// Mapping of category IDs to category names and CSS class names
const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" },
};

// Function to generate a category link given a category ID
const forumCategory = (id) => {
  let selectedCategory = {};

  if (allCategories.hasOwnProperty(id)) {
    // Use known category info if ID exists
    const { className, category } = allCategories[id];
    selectedCategory.className = className;
    selectedCategory.category = category;
  } else {
    // Fallback for unknown category IDs
    selectedCategory.className = "general";
    selectedCategory.category = "General";
    selectedCategory.id = 1;
  }

  // Construct URL, display text, and CSS class for the category link
  const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`;
  const linkText = selectedCategory.category;
  const linkClass = `category ${selectedCategory.className}`;

  // Return the HTML for the category link
  return `<a href="${url}" class="${linkClass}" target="_blank">
    ${linkText}
  </a>`;
};

// Function to convert a timestamp into "time ago" format
const timeAgo = (time) => {
  const currentTime = new Date();
  const lastPost = new Date(time);

  const timeDifference = currentTime - lastPost;
  const msPerMinute = 1000 * 60;

  const minutesAgo = Math.floor(timeDifference / msPerMinute);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }

  if (hoursAgo < 24) {
    return `${hoursAgo}h ago`;
  }

  return `${daysAgo}d ago`;
};

// Function to format view counts, e.g., 1200 → "1k"
const viewCount = (views) => {
  const thousands = Math.floor(views / 1000);

  if (views >= 1000) {
    return `${thousands}k`;
  }

  return views;
};

// Function to generate avatar images for a list of posters
const avatars = (posters, users) => {
  return posters
    .map((poster) => {
      // Find the user info by ID
      const user = users.find((user) => user.id === poster.user_id);
      if (user) {
        // Replace placeholder {size} in avatar template
        const avatar = user.avatar_template.replace(/{size}/, 30);
        // Build full URL if it's a relative path
        const userAvatarUrl = avatar.startsWith("/user_avatar/")
          ? avatarUrl.concat(avatar)
          : avatar;
        // Return HTML image element for avatar
        return `<img src="${userAvatarUrl}" alt="${user.name}" />`;
      }
    })
    .join(""); // Join all avatars into a single string
};

// Async function to fetch forum data and show posts
const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    showLatestPosts(data); // Call function to render posts
  } catch (err) {
    console.log(err);
  }
};

// Immediately fetch the data when the script runs
fetchData();

// Function to render forum topics into the table
const showLatestPosts = (data) => {
  const { topic_list, users } = data;
  const { topics } = topic_list;

  // Build HTML table rows for each topic
  postsContainer.innerHTML = topics.map((item) => {
    const {
      id,
      title,
      views,
      posts_count,
      slug,
      posters,
      category_id,
      bumped_at,
    } = item;

    return `
    <tr>
      <td>
        <!-- Link to the forum topic -->
        <a class="post-title" target="_blank" href="${forumTopicUrl}${slug}/${id}">${title}</a>

        <!-- Category link -->
        ${forumCategory(category_id)}
      </td>
      <td>
        <!-- Avatar images for posters -->
        <div class="avatar-container">
          ${avatars(posters, users)}
        </div>
      </td>
      <!-- Number of replies -->
      <td>${posts_count - 1}</td>
      <!-- View count -->
      <td>${viewCount(views)}</td>
      <!-- Time since last post -->
      <td>${timeAgo(bumped_at)}</td>
    </tr>`;
  }).join("");
};
