### Leetcode 1424 (Medium): Diagonal Traverse II [Practice](https://leetcode.com/problems/diagonal-traverse-ii)

### Description  
Given a list of lists `nums` (where each inner list can have different lengths), traverse the numbers in diagonal order. That is, all elements with the same sum of row + column indices (i + j) form one diagonal. The output should "flatten" all diagonals, grouping elements by increasing diagonal order (from smallest i + j to largest, and for each group, list the numbers in increasing row order). The result is a list of all elements, traversed diagonally from the top-left.

### Examples  

**Example 1:**  
Input: `nums = [[1,2,3],[4,5,6],[7,8,9]]`  
Output: `[1,4,2,7,5,3,8,6,9]`  
*Explanation:*
- Diagonal 0 (i+j=0): 1
- Diagonal 1 (i+j=1): 4,2
- Diagonal 2 (i+j=2): 7,5,3
- Diagonal 3 (i+j=3): 8,6
- Diagonal 4 (i+j=4): 9

**Example 2:**  
Input: `nums = [[1,2,3,4,5],[6,7],[8,9,10]]`  
Output: `[1,6,2,8,7,3,9,4,10,5]`  
*Explanation:*
- Diagonal 0: 1
- Diagonal 1: 6,2
- Diagonal 2: 8,7,3
- Diagonal 3: 9,4
- Diagonal 4: 10,5

**Example 3:**  
Input: `nums = [[1],[2,3],[4,5,6]]`  
Output: `[1,2,4,3,5,6]`  
*Explanation:*
- Diagonal 0: 1
- Diagonal 1: 2
- Diagonal 2: 4,3
- Diagonal 3: 5
- Diagonal 4: 6

### Thought Process (as if you’re the interviewee)  
A brute-force approach is to:
- For each element at position (i, j), use i + j as a "diagonal number".
- Group elements by this diagonal number in a dictionary or list of lists.
- For each diagonal, since we want to process elements in increasing row order (i from 0 up), append elements for each (i, j) in that order.
- Finally, iterate from smallest to largest diagonal, and append all numbers in that group to the answer.

This is efficient because:
- Each number is visited once, grouped by its diagonal, and then collected.

Alternative ideas:
- BFS from (0,0) by pushing (i+1, j) and (i, j+1); but grouping by i + j and appropriate order is much simpler and easier to implement than managing visited cells or custom queues.

### Corner cases to consider  
- nums is empty: `nums=[]`
- nums has only one row or column.
- Some inner lists are empty.
- nums is not rectangular: different row lengths.
- Duplicate numbers.

### Solution

```python
def findDiagonalOrder(nums):
    # Step 1: Group numbers by the sum (i + j)
    diagonals = dict()
    
    for i, row in enumerate(nums):
        for j, value in enumerate(row):
            diag = i + j
            if diag not in diagonals:
                diagonals[diag] = []
            # For order: we append as we go so row order is maintained
            diagonals[diag].append(value)
    
    result = []
    # Step 2: Visit diagonals in increasing order, and for each, add elements as collected
    diag_keys = sorted(diagonals.keys())
    for diag in diag_keys:
        result.extend(diagonals[diag])
        
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of elements in nums. We visit each element exactly once to group, once to output.
- **Space Complexity:** O(N), for storing grouped diagonals and output list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the output order should be reversed for every other diagonal?  
  *Hint: Diagonal zigzag pattern – reverse lists conditionally before extending to result.*

- What if the matrix were "infinite", i.e., nums is a stream, and we want to output the first K elements in diagonal order?  
  *Hint: Use a queue to process elements in BFS order up to K.*

- Can you solve it in-place without extra space, if modifying nums is allowed?  
  *Hint: Use pointers to mark processed positions, or perform in-place spiral.*

### Summary
This approach uses the "HashMap of lists" pattern to group by diagonal numbers (i + j), which is common for any diagonal/anti-diagonal or sum-index based traversals. It's a classic pattern that can also be seen in problems like diagonal traversal in binary trees, matrix spiral, or word search by column/diagonal. The output flattening from sorted keys ensures correct traversal order.