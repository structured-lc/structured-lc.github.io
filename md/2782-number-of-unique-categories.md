### Leetcode 2782 (Medium): Number of Unique Categories [Practice](https://leetcode.com/problems/number-of-unique-categories)

### Description  
You are given `n` elements numbered from 0 to n-1, and each element belongs to a category. You do **not** know the categories up front. Instead, you are given an object `CategoryHandler`, which provides `haveSameCategory(a, b)`: returns True if elements `a` and `b` are in the same category, otherwise returns False (also False for invalid indices). Your task is to determine how many **unique categories** exist among all elements.

### Examples  

**Example 1:**  
Input: `n = 6, categories = [1,1,2,2,3,3]`  
Output: `3`  
Explanation: First two elements are category 1, next two category 2, and last two category 3.  

**Example 2:**  
Input: `n = 5, categories = [1,2,3,4,5]`  
Output: `5`  
Explanation: Each element is its own unique category.

**Example 3:**  
Input: `n = 3, categories = [1,1,1]`  
Output: `1`  
Explanation: All elements belong to a single category.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - For each element, check against all previous elements if they are in the same category.  
  - For each element, add it as a new representative category if it doesn't match any previous categories.  
  - Time complexity: O(n²), which is OK for n ≤ 100.

- **Union-Find (DSU idea):**  
  - Since we only have a pairwise comparison interface, we can simulate union-find by maintaining a list of current representatives.  
  - For each element from 0 to n-1:  
    - See if it can be merged with any of the discovered category representatives.  
    - If not, treat it as a new category.  
  - This avoids redundant category creation and mirrors the interactive constraints.

- The brute-force and DSU approaches are effectively the same here due to lack of direct category info.  
- **Trade-offs:**  
  - With only an oracle/interactive API, we must make O(n²) comparisons in the worst case due to no underlying category knowledge.


### Corner cases to consider  
- **n = 1** (just one element → one unique category)
- **All elements in the same category**
- **All elements in distinct categories**
- **Random groupings (multiple elements per category, but counts differ)**
- **Duplicate elements (should not exist, as per spec)**
- **Invalid comparisons (check should never happen with out-of-bounds indices)**


### Solution

```python
# The interface for CategoryHandler is already provided in the problem.
# Let's assume haveSameCategory(a, b) is accessible via categoryHandler object.

def numberOfUniqueCategories(n, categoryHandler):
    # This list will keep the first element (representative) we've found for each category
    representatives = []
    
    for i in range(n):
        found = False
        # Check if 'i' is in any known category
        for rep in representatives:
            if categoryHandler.haveSameCategory(i, rep):
                found = True
                break
        # If not found in any existing category, treat 'i' as a new category representative
        if not found:
            representatives.append(i)
    # The number of unique categories is the number of discovered representatives
    return len(representatives)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each element, in the worst case, we compare with up to n prior representatives (at worst, n×n if all are unique).
- **Space Complexity:** O(n)  
  Need to store up to n representatives when all are unique.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is very large (e.g. >10⁵) and haveSameCategory is slow?
  *Hint: Ask about optimizing interactive calls, or reducing unnecessary checks.*

- How would your solution change if you had direct access to the category labels?
  *Hint: Think about counting unique values using a set.*

- Can you reduce the number of haveSameCategory calls in practice?
  *Hint: Can you skip comparisons by grouping or memoizing past knowledge?*

### Summary
This problem falls under **interactive simulation** for categories/DSU patterns. The main trick is recognizing that, without knowing labels, you must compare each item to possible existing categories and create a new one if there's no match. The key insight is simulating category detection with pairwise queries—very similar to union-by-representative DSU, but without path compression due to constraints. This is a basic but useful pattern for **interactive category detection**, and variants occur in clustering, grouping, and judge/oracle-based algorithms.


### Flashcard
For each element, check if it matches any existing category using the provided interface; count unique representatives for O(n²) time.

### Tags
Union Find(#union-find), Interactive(#interactive), Counting(#counting)

### Similar Problems
