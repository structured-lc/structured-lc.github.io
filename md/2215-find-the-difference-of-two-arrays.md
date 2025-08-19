### Leetcode 2215 (Easy): Find the Difference of Two Arrays [Practice](https://leetcode.com/problems/find-the-difference-of-two-arrays)

### Description  
Given two integer arrays, **nums₁** and **nums₂**, **find which unique elements are exclusive to each array**.  
- That is, return two lists:
  - The first contains elements that are present in **nums₁** but not in **nums₂**.
  - The second contains elements that are present in **nums₂** but not in **nums₁**.
- Each list should only contain *distinct* elements (i.e., no duplicates).

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,3]`, `nums2 = [2,4,6]`  
Output: `[[1,3],[4,6]]`  
*Explanation:*
- `1` and `3` are in `nums1` but not in `nums2`.
- `4` and `6` are in `nums2` but not in `nums1`.

**Example 2:**  
Input: `nums1 = [1,2,2,3]`, `nums2 = [2,2,4]`  
Output: `[[1,3],[4]]`  
*Explanation:*
- `nums1` has distinct values `{1,2,3}`. Only `1` and `3` are missing from `nums2`.
- `nums2` has distinct values `{2,4}`. Only `4` is missing from `nums1`.

**Example 3:**  
Input: `nums1 = [5, 5, 5]`, `nums2 = [5, 5, 5]`  
Output: `[[],[]]`  
*Explanation:*
- Both arrays only have the value `5`, so there are no exclusive elements.

### Thought Process (as if you’re the interviewee)  
First, I need to **extract the unique elements** from each list, so I'll use sets.  
- Brute-force would be to check, for each value in `nums1`, whether it's present in `nums2` (and vice versa), but that's inefficient (O(n²)).
- Optimization is to:
  - Convert `nums1` and `nums2` into sets for O(1) lookups and easy duplicate removal.
  - For the first list, collect items in `nums1_set` not in `nums2_set`.
  - For the second list, collect items in `nums2_set` not in `nums1_set`.
- Using sets, both steps can be done in O(n + m) time, where n and m are the lengths of the arrays.

This method leverages the set difference operation for readability and optimal performance.

### Corner cases to consider  
- Both arrays are empty: should return `[[],[]]`
- Arrays with all duplicate or identical elements.
- Arrays of different lengths.
- One array is empty, the other non-empty: should return `[nums1_unique, []]` or `[[], nums2_unique]`
- Arrays with negative or zero values.

### Solution

```python
def findDifference(nums1, nums2):
    # Convert both lists to sets to get unique elements and for fast lookup
    set1 = set(nums1)
    set2 = set(nums2)
    
    # Elements in set1 but not in set2
    diff1 = []
    for num in set1:
        if num not in set2:
            diff1.append(num)
    
    # Elements in set2 but not in set1
    diff2 = []
    for num in set2:
        if num not in set1:
            diff2.append(num)
    
    # Return the two lists in one list
    return [diff1, diff2]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = len(nums1), m = len(nums2).  
  - Constructing sets from the lists: O(n) + O(m)
  - Iterating through the sets to compute differences: O(n) + O(m)

- **Space Complexity:** O(n + m) for the sets and the output lists, since in the worst case, all elements are unique.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are very large and cannot fit in memory?  
  *Hint: Think about using generators, streaming, or external sorting.*

- How would you handle finding differences if the arrays contain objects or strings instead of integers?  
  *Hint: What properties must the items have? (hashable, comparable, etc.)*

- How would you solve the problem if duplicates should be kept, i.e., multiset difference?  
  *Hint: Utilize a Counter (hash map) and decrease counts accordingly.*


### Summary
This approach uses the **hash set pattern** — convert arrays to sets for efficient membership checks and uniqueness.  
It's a common pattern for array difference, union, and intersection problems and is broadly applicable in deduplication, membership, and comparison scenarios.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Intersection of Two Arrays(intersection-of-two-arrays) (Easy)
- Intersection of Two Arrays II(intersection-of-two-arrays-ii) (Easy)
- Intersection of Multiple Arrays(intersection-of-multiple-arrays) (Easy)