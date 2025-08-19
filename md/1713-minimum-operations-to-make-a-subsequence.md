### Leetcode 1713 (Hard): Minimum Operations to Make a Subsequence [Practice](https://leetcode.com/problems/minimum-operations-to-make-a-subsequence)

### Description  
You are given two integer arrays:
- **target**, which contains distinct integers (no duplicates).
- **arr**, which may contain duplicates and can be any length.

Your goal is to make **target** a subsequence of **arr** using the minimum number of insert operations. In one operation, you can insert any integer at any position in **arr**.  
A *subsequence* means you can delete some elements from **arr** (without reordering) to get **target** as an ordered subset.  
Return the minimum number of insertions required to achieve this.

---

### Examples  

**Example 1:**  
Input: `target = [5,1,3]`, `arr = [9,4,2,3,4]`  
Output: `2`  
*Explanation: Only "3" from target is present (order preserved).  
Insert "5" and "1" anywhere to get:  
[5,9,4,1,2,3,4]. Now target=[5,1,3] is a subsequence.*

**Example 2:**  
Input: `target = [6,4,8,1,3,2]`, `arr = [4,7,6,2,3,8,6,1]`  
Output: `3`  
*Explanation: Longest subsequence matching order in target is [4,8,3].  
We need to insert three numbers ("6","1","2") at right spots to get entire target as subsequence.*

**Example 3:**  
Input: `target = [1]`, `arr = [1,2,3]`  
Output: `0`  
*Explanation: "1" is already present as a subsequence (prefix), so 0 insertions are needed.*

---

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try all possible ways to insert the missing elements from **target** into **arr** to match the exact subsequence.  
  This is not feasible for large arrays (up to \(10^5\)) as the number of possible insertion positions explodes.

- **Optimized approach:**  
  Notice that you can only *insert* elements, and you want **target** as a *subsequence*.  
  This is equivalent to:
    - Finding the longest subsequence of **target** that is already in **arr** (order matters).
    - For elements *not* matched, insert them (since insertions can be made anywhere).
  So, minimum operations = `len(target) - length_of_longest_common_subsequence_in_order`.

  **Key Observation:**  
  Since **target** has *distinct* integers, map each value in **target** to its index (value → position).  
  Replace each value in **arr** (if it exists in **target**) with its position in **target**; the goal is then to find the *Longest Increasing Subsequence* (LIS) of this new array.

  - Matching `arr`'s entries to corresponding `target` indices preserves order.
  - The largest subset of **arr** matching in target-order is the Longest Increasing Subsequence of mapped indices.

- **Final approach:**  
  - Build a hashmap for target: value → index.
  - Walk through **arr**, keep mapped indices for values found in **target**.
  - Compute LIS (Longest Increasing Subsequence) of these indices in O(n log n) time.
  - Minimum insertions = len(target) - length of this LIS.

  This leverages the LIS pattern, which is more efficient than classical LCS (Longest Common Subsequence, O(n²)).

---

### Corner cases to consider  
- Both arrays empty: define as zero operations (nothing to match).
- **target** empty: 0 insertions needed (empty is subsequence of anything).
- **arr** empty: insert all target elements.
- No overlap between **target** and **arr**: need to insert all target elements.
- All target already subsequence of arr: 0 insertions.
- Duplicate elements in **arr** but not in **target**.
- **target** of length 1.

---

### Solution

```python
def min_operations(target, arr):
    # Step 1: Map each target value to its index
    index_map = {value: idx for idx, value in enumerate(target)}
    # Step 2: Build sequence of indices for arr's values *present* in target
    mapped_indices = []
    for num in arr:
        if num in index_map:
            mapped_indices.append(index_map[num])
    # Step 3: Find LIS on mapped_indices (O(n log n))
    import bisect
    lis = []
    for idx in mapped_indices:
        # Find insertion point to keep lis sorted
        pos = bisect.bisect_left(lis, idx)
        if pos == len(lis):
            lis.append(idx)
        else:
            lis[pos] = idx
    # Step 4: Minimum operations = difference between target length and LIS length
    return len(target) - len(lis)
```

---

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n + m log m), n = len(target), m = len(arr)  
    - Building the hashmap: O(n)
    - Building mapped_indices: O(m)
    - LIS search with bisect: O(m log m) worst case

- **Space Complexity:**  
  - O(n + m)
    - index_map dictionary: O(n)
    - mapped_indices and LIS arrays: up to O(m)

---

### Potential follow-up questions (as if you’re the interviewer)  

- If **target** contains duplicate values, how does this change the approach?  
  *Hint: LCS would be required instead of LIS, impacting time complexity.*

- Can you solve this in O(m) time if insertions at only one end are permitted?  
  *Hint: Consider if you still can use LIS or need another structure.*

- What if delete operations are allowed on **arr** as well?  
  *Hint: Think of classical edit distance or operations for subsequence transformation.*

---

### Summary
This problem is solved efficiently using the **Longest Increasing Subsequence** (LIS) pattern, taking advantage of the fact that **target** contains only distinct elements. Mapping arr's entries to target indices and finding LIS allows us to capture the largest possible subsequence already in order, and the rest are inserted. This pattern appears in problems that seek subsequence matching with order preserved and is a powerful tool for transforming sequence alignment problems involving insert-only steps.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Greedy(#greedy)

### Similar Problems
- Append Characters to String to Make Subsequence(append-characters-to-string-to-make-subsequence) (Medium)