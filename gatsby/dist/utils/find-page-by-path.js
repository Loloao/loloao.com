"use strict";

exports.__esModule = true;
exports.findPageByPath = findPageByPath;

var _reachRouter = require("@gatsbyjs/reach-router");

// Ranks and picks the best page to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our pages, let the
// computers do it.
//
// In the future, we could move this pagesByMatchPath computation outside this
// function and save some processing power
const findBestMatchingPage = (pages, path) => {
  // Pick only routes with matchPath for better performance.
  // Exact match should have already been checked
  const pagesByMatchPath = {};

  for (const page of pages.values()) {
    const matchPath = page.matchPath;

    if (matchPath) {
      pagesByMatchPath[matchPath] = page;
    }
  }

  const routes = Object.keys(pagesByMatchPath).map(path => {
    return {
      path
    };
  }); // picks best matching route with reach router's algorithm

  const picked = (0, _reachRouter.pick)(routes, path);

  if (picked) {
    return pagesByMatchPath[picked.route.path];
  }

  return null;
};

function findPageByPath(state, path, fallbackTo404 = false) {
  const {
    pages
  } = state;

  try {
    path = decodeURIComponent(path);
  } catch {// no handling, just continue using path as-is
  } // first check by exact path


  let page = pages.get(path);

  if (page) {
    return page;
  }

  if (path === ``) {
    // from my tests I never was able to make request with
    // completely empty pathname, but just for the sake
    // of completeness - try available alternative
    page = pages.get(`/`);

    if (page) {
      return page;
    }
  } // Gatsby doesn't allow for page path to be empty string,
  // so skipping trying to get page for "" path if we can't
  // find page for `/`
  else if (path !== `/`) {
    // check various trailing/leading slashes combinations
    const hasLeadingSlash = path.startsWith(`/`);
    const hasTrailingSlash = path.endsWith(`/`);
    const bare = path.slice(hasLeadingSlash ? 1 : 0, hasTrailingSlash ? -1 : path.length);
    [bare, `/` + bare, bare + `/`, `/` + bare + `/`].some(potentialPath => {
      page = pages.get(potentialPath);
      return !!page;
    });

    if (page) {
      return page;
    }
  } // we didn't find exact static page, time to check matchPaths
  // TODO: consider using `match-paths.json` generated by `requires-writer`
  // to avoid looping through all pages again. Ideally generate smaller `match-paths.json`
  // variant that doesn't including overlapping static pages in `requires-writer` as well
  // as this function already checked static paths at this point


  const matchingPage = findBestMatchingPage(pages, path);

  if (matchingPage) {
    return matchingPage;
  }

  if (fallbackTo404) {
    var _findPageByPath;

    return (_findPageByPath = findPageByPath(state, `/dev-404-page/`, false)) !== null && _findPageByPath !== void 0 ? _findPageByPath : findPageByPath(state, `/404.html`, false);
  }

  return undefined;
}
//# sourceMappingURL=find-page-by-path.js.map