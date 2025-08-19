### Leetcode 2965 (Easy): Find Missing and Repeated Values [Practice](https://leetcode.com/problems/find-missing-and-repeated-values)

### Description  
Given an n × n matrix (grid) containing numbers from 1 to n² where:
- One number is missing,
- One number appears twice (repeated),
- All other numbers from 1 to n² appear exactly once.

Return an array [repeated, missing].

Imagine each number from 1 to n² should appear exactly once in the matrix, but due to an error, one number is repeated and another is missing. Your task is to find these two numbers.

### Examples  

**Example 1:**  
Input: `grid = [[1,3],[2,2]]`  
Output: `[2,4]`  
*Explanation: Numbers from 1 to 4 should appear. `2` appears twice, and `4` is missing. So, [2, 4].*

**Example 2:**  
Input: `grid = [[9,1,7],[8,9,2],[3,4,6]]`  
Output: `[9,5]`  
*Explanation: Should have numbers from 1 to 9. Number `9` appears twice; `5` is missing.*

**Example 3:**  
Input: `grid = [[3,2,1],[1,4,6],[7,8,9]]`  
Output: `[1,5]`  
*Explanation: Should have numbers 1 to 9. `1` appears twice; `5` is missing.*

**Example 4 (tree-style for visualization):**  
Grid:  
```
[ [3, 5, 1],
  [6, 2, 0],
  [8, null, null] ]
List: [3,5,1,6,2,0,8,null,null]
```
Output: *follow the same pattern if asked in a tree-form conversion context*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Check for every number from 1 to n², count how many times it appears by scanning the entire grid each time. This would be extremely inefficient: O(n⁴) for n × n grid.

- **Hash Set/Count Array:**  
  Use an array (size n² + 1) to count occurrences of each number:
  - Scan the grid once, increment count for each number.
  - Then, scan the count array for count == 2 (repeated value) and count == 0 (missing value).
  - This is O(n²) time and O(n²) space.
  
- **Optimal approach:**  
  Use the efficient count array method: iterate the grid once, count occurrences, then a second pass for the answer. This provides an easy-to-explain, reliable, and fast-enough solution for realistic values of n.  
  No need for fancy math as only one number is repeated, and exactly one is missing.

### Corner cases to consider  
- n = 1 (single cell grid)
- Grid contains minimum and/or maximum possible values (1 or n²) as the missing or the repeated number
- The repeated number is at the very beginning or end
- Grid has only 1 row or only 1 column
- Input with unsorted grid
- Validate all input is in range [1, n²] (though LeetCode constraints usually guarantee it)

### Solution

```python
def findMissingAndRepeatedValues(grid):
    # n x n grid, values from 1 to n*n
    n = len(grid)
    max_val = n * n

    # Count occurrence of each number from 1 to n*n
    count = [0] * (max_val + 1)

    for row in grid:
        for val in row:
            count[val] += 1

    repeated = missing = -1

    for num in range(1, max_val + 1):
        if count[num] == 2:
            repeated = num
        elif count[num] == 0:
            missing = num

    return [repeated, missing]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  - One pass to count occurrences (all elements: n²).
  - One pass over count array (up to n² entries).
- **Space Complexity:** O(n²).  
  - The count array uses O(n²) space for numbers 1 to n² (extra n²+1 array).  
  - No recursion/explicit stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can't use extra space (no count array allowed)?  
  *Hint: Can you use mathematical properties (sum, sum of squares) to deduce missing/repeated?*

- What if the grid is very large and you must process it row-by-row from a stream?  
  *Hint: Can you maintain running totals and counts by streaming data?*

- How would you generalize this to k missing and k repeated numbers?  
  *Hint: Consider using hash maps or other data structures to track counts efficiently.*

### Summary
This problem is a common instance of the "find the missing and duplicated number" pattern, which is often handled by counting occurrences. It illustrates counting/hash frequency methods, matrix traversal, and basic error detection in structured numeric data. The counting approach is a classic solution to problems involving finding duplicates and missing elements, and appears in various forms like finding a missing number in arrays, error detection, and matrix validation.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Matrix(#matrix)

### Similar Problems
