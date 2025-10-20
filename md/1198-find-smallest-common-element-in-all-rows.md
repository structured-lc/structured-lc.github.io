### Leetcode 1198 (Medium): Find Smallest Common Element in All Rows [Practice](https://leetcode.com/problems/find-smallest-common-element-in-all-rows)

### Description  
Given a matrix where each row is sorted in increasing order, find the **smallest element** that appears in **every row**. If no such element exists, return -1.  
Explain the approach as if you’re interviewing: You’re given several sorted lists, and you must efficiently find the lowest value present in every list.

### Examples  

**Example 1:**  
Input: `[[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]]`  
Output: `5`  
*Explanation: 5 appears in every row and is the smallest such value.*

**Example 2:**  
Input: `[[1,2,3,4,5],[6,7,8,9,10]]`  
Output: `-1`  
*Explanation: No number appears in both rows; return -1.*

**Example 3:**  
Input: `[[2,2,3],[2,2,5],[2,6,7]]`  
Output: `2`  
*Explanation: 2 appears in all rows. Repeated values within a row don’t matter; the number just needs to appear at least once per row.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force**:  
  For each element in the first row, check if it appears in every other row. This would involve, for each candidate, a search through each row (which can be quick due to sorting), but in the worst case, this can be slow if both dimensions are large.

- **Counting Approach**:  
  Create a count of all elements for all rows. Any element whose count equals the number of rows must be present in each row. Since values are limited (up to 10⁴), we can use an array or hashmap to count occurrences efficiently.

- **Optimized using Pointers**:  
  Since every row is sorted, we can use a method similar to merging k sorted lists, advancing pointers in each row to match elements. Maintain an index for each row and look for a number that synchronizes across all rows.

- **Trade-offs**:  
  Counting is very simple and takes O(rows × cols) time and O(range of values) space, which is acceptable for this problem size. The pointer solution is efficient in practice and doesn’t require much extra memory.

- **Final approach**:  
  For interviews, the counting solution is most direct, but for performance-critical code, I’d mention the "multi-pointer" approach for further optimization.

### Corner cases to consider  
- Matrix with only one row: every value is trivially common.
- All values are the same in every row.
- No common elements.
- Rows of different lengths.
- Multiple identical values within a row.
- Largest possible values (near 10⁴).
- Negative test: completely disjoint rows.

### Solution

```python
def smallestCommonElement(mat):
    # Number of rows
    rows = len(mat)
    # Count occurrences of each number
    count = {}
    for row in mat:
        seen = set()
        for num in row:
            # We only want to count each number once per row 
            if num not in seen:
                count[num] = count.get(num, 0) + 1
                seen.add(num)
    # Find the minimal number appearing in every row
    smallest = float('inf')
    for num in count:
        if count[num] == rows and num < smallest:
            smallest = num
    return smallest if smallest != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m is the number of rows and n is the number of columns. We visit every element once.  
- **Space Complexity:** O(U), where U is the number of unique elements (at most the total size, but bounded by problem constraints). We store counts for each unique value.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix could be extremely large (cannot store all counts in memory)?
  *Hint: Can you process the data sequentially, or admit approximate results via streaming?*

- The matrix rows are not sorted. How would this change your approach?
  *Hint: The pointer method relies on sorted rows; you might need to count or sort.*

- What if rows have duplicate values? Should you count duplicates?
  *Hint: Should each occurrence in a row be counted, or only the presence in that row?*

### Summary
This problem uses a **hashmap counting technique** to find intersection across multiple sorted lists, a pattern common in "find all common elements" questions. For sorted arrays, a multi-pointer technique inspired by merge algorithms or k-way merge is also efficient. Both strategies are frequently applied in problems involving list/array intersections or aggregating statistics across datasets.


### Flashcard
Count element frequencies across rows; the smallest element with count = row count is the answer.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Matrix(#matrix), Counting(#counting)

### Similar Problems
- Intersection of Multiple Arrays(intersection-of-multiple-arrays) (Easy)