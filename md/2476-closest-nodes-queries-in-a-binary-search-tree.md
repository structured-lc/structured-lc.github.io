### Leetcode 2476 (Medium): Closest Nodes Queries in a Binary Search Tree [Practice](https://leetcode.com/problems/closest-nodes-queries-in-a-binary-search-tree)

### Description  
Given the root of a **binary search tree** (BST) and an array of integer queries, for each query, return a pair of integers: the largest value in the BST ≤ query, and the smallest value in the BST ≥ query. If such a value does not exist, use -1 for that spot.  
In short: For every query, find the closest node values in the BST—one not greater than the query, and one not less than the query.

### Examples  

**Example 1:**  
Input:  
Root = `[6,2,13,1,4,9,15,null,null,null,null,7,11]`,  
Queries = `[2,5,16]`  
Output:  
`[[2,2], [4,6], [15,-1]]`  
*Explanation*:  
- Query 2: Both closest ≤ and ≥ values are 2.  
- Query 5: Closest ≤ is 4, closest ≥ is 6.  
- Query 16: No value matches or exceeds 16, so ≥ is -1; maximum value ≤ 16 is 15.

Tree:
```
      6
    /   \
   2     13
  / \   /  \
 1   4 9   15
        / \
       7  11
```

**Example 2:**  
Input:  
Root = `[3,1,4,null,2]`,  
Queries = `[0,2,5]`  
Output:  
`[[-1,1],[2,2],[4,-1]]`  
*Explanation*:  
- Query 0: No node ≤ 0, so left is -1; 1 is the minimum ≥ 0.  
- Query 2: Both closest ≤ and ≥ values are 2.  
- Query 5: No node ≥ 5, closest ≤ is 4.

Tree:
```
   3
  / \
 1   4
  \
   2
```

**Example 3:**  
Input:  
Root = ``,  
Queries = `[10,5,20]`  
Output:  
`[[10,10],[ -1,10],[10,-1]]`  
*Explanation*:  
- Query 10: Node is 10.  
- Query 5: No ≤ 5, closest ≥ is 10.  
- Query 20: 10 is the only value, so ≤ 20 is 10; ≥ 20 is -1.

Tree:
```
10
```

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  For each query, traverse the BST to look for the closest ≤ and ≥ values, potentially O(n) per query (inefficient for many queries).

- **Optimizing**:  
  Since the BST's in-order traversal yields values in sorted order, we can:
    1. Use in-order traversal to produce a sorted list of all node values (O(n)).
    2. For each query, binary search (O(log n)) for both closest ≤ and ≥ value in that sorted list.
  This brings the total complexity to O(n + q log n) where n = number of BST nodes, q = queries.

- **Why this final approach?**  
  - In-order traversal is fast, deterministic, and produces sorted data for use with binary searching.
  - This pattern is robust, memory efficient, and easy to implement, and fits well for repeated range/closest element queries on tree-like data.

### Corner cases to consider  
- The BST contains only one node.
- Queries less than the minimum BST value.
- Queries greater than the maximum BST value.
- All queries match node values exactly.
- A BST with duplicate values (if allowed—usually not in classic BST).
- Empty queries array.
- Larger BSTs, but no matching queries.

### Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def closestNodes(root, queries):
    # Step 1: Traverse BST in-order to get sorted values
    def inorder(node, nums):
        if not node:
            return
        inorder(node.left, nums)
        nums.append(node.val)
        inorder(node.right, nums)
    
    nums = []
    inorder(root, nums)
    
    # Step 2: Binary search to find closest ≤ and ≥ for each query
    def binary_search_left(nums, target):
        # Largest index with nums[i] ≤ target, or -1 if none
        left, right = 0, len(nums) - 1
        ans = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] <= target:
                ans = nums[mid]
                left = mid + 1
            else:
                right = mid - 1
        return ans

    def binary_search_right(nums, target):
        # Smallest index with nums[i] ≥ target, or -1 if none
        left, right = 0, len(nums) - 1
        ans = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] >= target:
                ans = nums[mid]
                right = mid - 1
            else:
                left = mid + 1
        return ans
        
    result = []
    for q in queries:
        min_val = binary_search_left(nums, q)
        max_val = binary_search_right(nums, q)
        result.append([min_val, max_val])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    O(n + q log n)  
    - O(n): In-order traversal to produce sorted list of node values.
    - O(log n) per query for binary search, total O(q log n) for q queries.

- **Space Complexity:**  
    O(n + q)  
    - O(n): To store in-order list of all BST node values.
    - O(q): For output array of results.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle continuous dynamic inserts/deletes in the BST while supporting fast queries?
  *Hint: Consider self-balancing trees, or data structures supporting order-statistics and rank queries online.*

- What if the queries represent intervals, and you want all BST values within [l, r] for each?
  *Hint: Modify your search to find both interval bounds and collect all values within indices.*

- Can you optimize further if queries are known in advance, or if all queries are sorted?
  *Hint: Try aligning the query pointer and BST array pointer and process in a single pass.*

### Summary
This problem is a classic mix of BST traversal and the sorted array binary search pattern. The efficient solution uses in-order traversal to turn tree queries into array lookups, then pairs binary search to answer range/closest-value questions in O(log n) per query. This "flatten + binary search" pattern is very common for repeated min/max/find/range lookups on static BSTs, and is widely applicable to interval/neighbor queries on ordered data.


### Flashcard
In-order traverse BST to get sorted list, then for each query, binary search for floor (largest ≤ query) and ceiling (smallest ≥ query) values.

### Tags
Array(#array), Binary Search(#binary-search), Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Closest Binary Search Tree Value(closest-binary-search-tree-value) (Easy)
- Closest Binary Search Tree Value II(closest-binary-search-tree-value-ii) (Hard)
- Search in a Binary Search Tree(search-in-a-binary-search-tree) (Easy)