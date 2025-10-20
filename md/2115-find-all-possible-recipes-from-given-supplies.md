### Leetcode 2115 (Medium): Find All Possible Recipes from Given Supplies [Practice](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies)

### Description  
Given a list of recipes and their required ingredients, and a set of ingredients you initially have (supplies), find out *all* the recipes you are able to make. A recipe can require basic supplies, but may also require other recipes as ingredients. You can only use a recipe as an ingredient after you've already made it. Return all recipes you can make given unlimited quantities of your initial supplies.

### Examples  

**Example 1:**  
Input:  
recipes = `["bread", "sandwich", "burger"]`,  
ingredients = `[["yeast", "flour"], ["bread", "meat"], ["sandwich", "bread", "meat"]]`,  
supplies = `["yeast", "flour", "meat"]`  
Output: `["bread", "sandwich", "burger"]`  
*Explanation:*
- You can make "bread" (use "yeast" and "flour" from supplies).
- Now you have "bread", so you can make "sandwich" (needs "bread" and "meat").
- Finally, you can make "burger" (needs "sandwich", "bread", and "meat").
- All recipes are possible.

**Example 2:**  
Input:  
recipes = `["bread"]`,  
ingredients = `[["yeast", "flour", "egg"]]`,  
supplies = `["flour", "yeast"]`  
Output: `[]`  
*Explanation:*
- "egg" is missing in supplies, so "bread" cannot be made.

**Example 3:**  
Input:  
recipes = `["a","b"]`,  
ingredients = `[["b"],["a"]]`,  
supplies = `[]`  
Output: `[]`  
*Explanation:*
- Both recipes depend on each other but nothing is present in initial supplies, so neither can be made.

### Thought Process (as if you’re the interviewee)  
The brute-force way would be to, for each recipe, check if *all* its ingredients are available either directly in supplies or via being able to make those recipes recursively. However, this can cause repeated work and potential infinite loops if there's a circular dependency.  

Optimally, this is a classic dependency resolution problem, which is best solved with **topological sort**:
- Build a graph: nodes are recipes, edges are ingredients pointing to recipes they’re required for.
- Track in-degree (number of unmet dependencies) for each recipe.
- Start with supplies (nodes that we *always* have available).
- Repeatedly pick anything whose dependencies are met (in-degree=0), make it, and use it to unlock further recipes.
- If a recipe’s dependency never can be made, it is never possible.
  
This ensures each dependency check is only done once per recipe and avoids infinite loops.

### Corner cases to consider  
- No supplies at all (empty list).
- Recipes that depend on themselves directly or indirectly (cycles).
- Some recipes require only supplies, with no dependency on other recipes.
- Some recipes have ingredients that are not in supplies or among the defined recipes.
- Different recipes sharing common ingredients.
- Multiple recipes, but only a subset can ever be made.

### Solution

```python
def findAllRecipes(recipes, ingredients, supplies):
    # Map from each ingredient to the list of recipes that need it
    from collections import defaultdict, deque

    ingredient_to_recipes = defaultdict(list)
    indegree = {recipe: 0 for recipe in recipes}

    # Build the graph: for each recipe, note which ingredients are required
    for recipe, reqs in zip(recipes, ingredients):
        for item in reqs:
            ingredient_to_recipes[item].append(recipe)
        indegree[recipe] = len(reqs)  # initial unmet dependencies

    # Use a queue to process available "supplies"
    queue = deque(supplies)
    made = set(supplies)  # everything we've already "made" or have by default

    result = []

    while queue:
        item = queue.popleft()
        # For all recipes that need this item
        for recipe in ingredient_to_recipes[item]:
            indegree[recipe] -= 1
            if indegree[recipe] == 0:
                # All dependencies for this recipe are satisfied
                queue.append(recipe)
                made.add(recipe)
                result.append(recipe)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(V + E), where V is the number of unique items (recipes + ingredients), and E is the total number of ingredient-recipe dependencies. We do a pass per ingredient edge and each recipe is enqueued at most once.
- **Space Complexity:** O(V + E) for the graph, indegree map, and queue/result storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if recipes or supplies are extremely large — how does this scale?
  *Hint: Discuss adjacency list vs. matrix and how to reduce memory footprint.*

- Can there be cycles (recipes depending circularly), and how does your code handle them?
  *Hint: What would topological sort do in case of a cycle?*

- If you had limited amounts of supplies, how would you modify your approach?
  *Hint: Each usage decrements supply, need to track quantities; DFS/backtracking.*

### Summary
This problem is a classic application of **topological sort** or **dependency resolution**. It uses a breadth-first approach to build up what's possible from available supplies and tracks recipe prerequisites in graph form. The pattern is common in build systems, package managers, and course scheduling problems. This interview pattern is useful for any scenario where there are tasks with prerequisite dependencies.


### Flashcard
Build a dependency graph and use topological sort (BFS/DFS) to determine which recipes can be made from supplies.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Course Schedule II(course-schedule-ii) (Medium)
- Count Good Meals(count-good-meals) (Medium)