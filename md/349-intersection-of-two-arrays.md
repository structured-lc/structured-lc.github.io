### Leetcode 349 (Easy): Intersection of Two Arrays [Practice](https://leetcode.com/problems/intersection-of-two-arrays)

### Description  
Given two integer arrays, find their intersection—return the unique elements that appear in both arrays.  
The output should not include duplicates, regardless of how many times a value appears in either input.  
Order of results does not matter.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,2,1]`, `nums2 = [2,2]`  
Output: `[2]`  
*Explanation: Both arrays contain 2. The result must not have duplicates.*

**Example 2:**  
Input: `nums1 = [4,9,5]`, `nums2 = [9,4,9,8,4]`  
Output: `[9,4]`  
*Explanation: The intersection is [9,4]. Duplicates are ignored; any order is fine.*

**Example 3:**  
Input: `nums1 = [1,3,5]`, `nums2 = [2,4,6]`  
Output: `[]`  
*Explanation: No values occur in both arrays, so the result is empty.*

### Thought Process (as if you’re the interviewee)  
First, clarify the constraints:
- Are both arrays always non-empty? No, they can be empty.
- Are the arrays sorted? They can be unsorted.
- Can the output be in any order? Yes.
- Should the result contain only unique elements? Yes.

**Brute-force idea:**  
Iterate through each element in one array (`nums1`). For each, scan the entire second array (`nums2`) for a match. Use a result set to ensure uniqueness, but checking every pair of elements yields O(n×m) time.

**Can we optimize?**  
Since we only need unique elements, using a set for O(1) lookups is efficient.  
- Convert the smaller array to a set.
- For each element in the second array, check if it exists in the set.
- If yes, add it to the result set (to ensure uniqueness), and optionally remove from the set to avoid duplicate work.

**Trade-offs:**  
- Set conversion costs extra space, but it brings O(1) lookups.
- Time is reduced from O(n×m) brute-force to O(n + m).

**Final approach:**  
Convert one array to a set, then iterate through the other, collecting unique intersections.  
Alternatively, use set intersection operations directly.

### Corner cases to consider  
- One or both arrays empty: Should return `[]`.
- No elements in common: Should return `[]`.
- All elements are the same: Only unique values should be returned.
- Duplicates in either array: Only unique intersection in result.
- Different array lengths.

### Solution

```python
def intersection(nums1, nums2):
    # Convert first list to a set for fast lookup
    lookup = set(nums1)
    result = set()
    # Iterate over the second array
    for num in nums2:
        # If num is in lookup, it's part of intersection
        if num in lookup:
            result.add(num)
    # Convert set to list for the required output
    return list(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n and m are the lengths of the arrays.  
  - Converting the first array to a set is O(n).
  - Iterating over the second array and checking set membership is O(m).
- **Space Complexity:** O(n), for the set created from the first array, plus O(k) for the result set (k ≤ min(n, m)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are both sorted?  
  *Hint: Try using two pointers to scan both arrays at once and skip duplicates on the fly.*

- What if one array is much smaller than the other?  
  *Hint: Build your lookup set from the smaller array to optimize space and, in some cases, minimize iterations.*

- How would you handle extremely large arrays that do not fit in memory?  
  *Hint: Could you process them in a streaming or chunked fashion or use external memory sets?*

### Summary  
This problem uses the **hash set** pattern: sets provide O(1) lookup and enforce uniqueness, making them a natural fit for intersection tasks.  
This is a foundation for problems involving fast membership checks, such as finding union, distinct elements, or differences between sets.