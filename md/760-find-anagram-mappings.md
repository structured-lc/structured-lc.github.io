### Leetcode 760 (Easy): Find Anagram Mappings [Practice](https://leetcode.com/problems/find-anagram-mappings)

### Description  
Given two integer arrays **A** and **B**, where **B** is an anagram of **A** (i.e., **B** contains all the elements from **A**, but possibly in a different order, and with possible duplicates), construct a mapping array **P** such that for each index *i*, **P\[i\]** is an index *j* where **A\[i\] = B\[j\]**.  
If there are multiple possible answers (due to duplicates), any valid mapping is allowed, but each *B\[j\]* can only be mapped once.

### Examples  

**Example 1:**  
Input: `A = [12, 28, 46, 32, 50]`, `B = [50, 12, 32, 46, 28]`  
Output: `[1, 4, 3, 2, 0]`  
*Explanation:*
- A = 12, B[1] = 12 ⇒ P = 1
- A[1] = 28, B[4] = 28 ⇒ P[1] = 4
- A[2] = 46, B[3] = 46 ⇒ P[2] = 3
- A[3] = 32, B[2] = 32 ⇒ P[3] = 2
- A[4] = 50, B = 50 ⇒ P[4] = 0

**Example 2:**  
Input: `A = [1, 2, 3, 3]`, `B = [3, 1, 2, 3]`  
Output: `[1, 2, 0, 3]`  
*Explanation:*
- A=1 at B[1], A[1]=2 at B[2], A[2]=3 at B (first 3), A[3]=3 at B[3] (second 3)

**Example 3:**  
Input: `A = [5]`, `B = [5]`  
Output: ``  
*Explanation:*  
- Both arrays have a single element equal; mapping is trivial.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each element in **A**, scan through **B** to find a matching value that hasn’t been used yet. Keep track of used indices in **B**. This leads to O(n²) complexity.

- **Optimized Approach:**  
  Use a **hash map** to store, for each unique number in **B**, all its indices (as a set or queue).  
  Then, for each value in **A**, retrieve an available index from the set/queue for that value from the hash map, and save it to the result.  
  This reduces the time to O(n), since hash map lookups and removals are efficient.

- **Why hash map over sort-based:**  
  Sorting both arrays and tracking original indices is possible (as some solutions do), but building a **number -> indices** map is more intuitive and efficient, especially with duplicates.

### Corner cases to consider  
- Arrays with all identical elements: e.g., `A = [2,2,2], B = [2,2,2]`  
- Arrays with single element  
- Arrays empty (`A = [], B = []`), though constraint may guarantee non-empty  
- A and B with multiple duplicates for some numbers  
- Already identical arrays  
- Mapping when elements are in entirely reversed order

### Solution

```python
def anagramMappings(A, B):
    # Map each number in B to a list of its indices
    num_to_indices = {}
    for idx, val in enumerate(B):
        if val not in num_to_indices:
            num_to_indices[val] = []
        num_to_indices[val].append(idx)
    
    # For A, for each value, pop (use) one index from corresponding value in B
    result = []
    for val in A:
        idx_in_B = num_to_indices[val].pop()
        result.append(idx_in_B)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) — O(n) for mapping all of B’s indices, and O(n) for building the answer.

- **Space Complexity:**  
  O(n) — needed for storing the indices mapping (`num_to_indices`) and the output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if B is not guaranteed to be an anagram of A?
  *Hint: How do you handle missing or extra elements between A and B?*

- How would you modify your approach if repeated values’ original order in B must be preserved for mappings?
  *Hint: Consider queue vs stack for managing indices.*

- What if the arrays are very large and memory is constrained?
  *Hint: How to optimize space, or do it in-place, if possible?*

### Summary
This solution uses the **hash map** coding pattern—a common technique for mapping values to positions or frequencies, especially when handling duplicates.  
It’s highly reusable in problems requiring element-to-index (or value-to-location) correspondences, such as “two sum”, “group anagrams”, and similar search tasks.  
Efficient mapping via hash tables offers both speed and clarity for small and large input sizes.