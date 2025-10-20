### Leetcode 2519 (Hard): Count the Number of K-Big Indices [Practice](https://leetcode.com/problems/count-the-number-of-k-big-indices)

### Description  
Given a 0-indexed array of integers `nums` and a positive integer `k`, an index `i` is called **k-big** if:
- There are at least `k` *different* indices `idx1 < i` such that `nums[idx1] < nums[i]`
- There are at least `k` *different* indices `idx2 > i` such that `nums[idx2] < nums[i]`

Return the number of **k-big** indices in the array.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 6, 5, 2, 3]`, `k = 2`  
Output: `2`  
Explanation:  
- For `i = 2 (nums[2]=6)`, to its left (`[2, 3]`): both values `< 6` (2), (3) ⇒ two valid;  
  to its right (`[5,2,3]`): (5), (2), (3) are all `< 6` ⇒ three valid.  
- For `i = 3 (nums[3]=5)`, to its left (`[2,3,6]`): (2), (3) are `< 5` ⇒ two valid;  
  to its right (`[2,3]`): both `< 5` ⇒ two valid.  
So, indices 2 and 3 are k-big.

**Example 2:**  
Input: `nums = [1, 1, 1]`, `k = 3`  
Output: `0`  
Explanation:  
- No index can have 3 values both to its left and right smaller than itself (since all elements are equal).

**Example 3:**  
Input: `nums = [3,5,1,2,4]`, `k=2`  
Output: `1`  
Explanation:  
- Only index 4 (value 4):  
    left: [3,5,1,2], numbers smaller than 4 are (3,1,2) ⇒ three valid  
    right: [] (empty), so not enough  
- Actually only index 1 (value 5):  
    left: [3], only 1 value  
    right: [1,2,4], all three < 5 ⇒ but not enough in left, so  
- Only index 3 (value 2):  
    left: [3,5,1], only 1 value < 2 → none satisfies both sides  
- Correction: No index satisfies both sides, so output is `0`.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  For each index `i`, count the number of elements less than `nums[i]` on its left and on its right.  
  - For left side: loop from `0` to `i-1`.  
  - For right side: loop from `i+1` to `n-1`.  
  - If both counts ≥ k, count `i` as a valid index.  
  - This would be O(n²), which is too slow for n up to 10⁵.

- **Optimize:**  
  We need a way to quickly count, for each index, how many numbers before and after are less than the current value.  
  - Use **Binary Indexed Tree (Fenwick Tree)** or **Segment Tree** to efficiently keep prefix sum/counts.  
  - Process from left to right to find, for each `i`, count of elements before `i` < `nums[i]`.  
  - Similarly, process from right to left for the right-side count.  
  - If both counts ≥ k, increment answer.  
  - This brings time complexity down to O(n log MAXV), where MAXV is the range of numbers.

- **Implementation challenges:**  
  Since values of `nums[i]` can be large, need to discretize/coordinate compress them for the Fenwick Tree.

### Corner cases to consider  
- Empty array, though by constraints 1 ≤ n  
- k > n, impossible, output 0  
- All elements are equal  
- k = 1 (smallest value for k)  
- Array is strictly increasing or decreasing  
- Duplicate values and their handling

### Solution

```python
# Fenwick Tree implementation for count of numbers less than a value
class FenwickTree:
    def __init__(self, size):
        self.n = size + 2  # 1-based index, add buffer
        self.tree = [0] * self.n
    
    def update(self, index, value):
        i = index
        while i < self.n:
            self.tree[i] += value
            i += (i & -i)
    
    def query(self, index):
        # sum from 1 to index
        res = 0
        i = index
        while i > 0:
            res += self.tree[i]
            i -= (i & -i)
        return res

def countKBigIndices(nums, k):
    n = len(nums)
    # Coordinate compression to ensure nums[i] range is small for BIT
    arr = sorted(set(nums))
    value_to_index = {v: idx+1 for idx, v in enumerate(arr)}  # BIT is 1-based
    m = len(arr)
    
    # left_smaller[i]: nums[0..i-1], count of < nums[i]
    left_smaller = [0] * n
    ft_left = FenwickTree(m)
    for i in range(n):
        # number of values strictly less than nums[i] in prefix
        idx = value_to_index[nums[i]]
        left_smaller[i] = ft_left.query(idx - 1)
        ft_left.update(idx, 1)
    
    # right_smaller[i]: nums[i+1..n-1], count of < nums[i]
    right_smaller = [0] * n
    ft_right = FenwickTree(m)
    for i in range(n-1, -1, -1):
        idx = value_to_index[nums[i]]
        right_smaller[i] = ft_right.query(idx - 1)
        ft_right.update(idx, 1)
    
    ans = 0
    for i in range(n):
        if left_smaller[i] >= k and right_smaller[i] >= k:
            ans += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building coordinate compression: O(n log n)  
  - Two passes over the array with Fenwick Tree, each O(n log n)  
  - Final scan: O(n)  
  - Overall: **O(n log n)**

- **Space Complexity:**  
  - Arrays for left_smaller, right_smaller: O(n)  
  - Fenwick Trees: O(n) in worst case (unique values)  
  - Total: **O(n)**

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if nums[i] could be negative, or very large, or not bounded?
  *Hint: Use coordinate compression to safely map all values to a small range for the Fenwick Tree or Segment Tree.*

- Can you do it in one pass, using only one tree?
  *Hint: It's difficult because left and right info are needed at the same time; usually two passes are minimum for this problem class.*

- How would you handle dynamic updates (changing nums[i]) and answering k-big index queries after updates?
  *Hint: Need a dynamic data structure, likely a Segment Tree supporting range queries and point updates.*

### Summary
This problem is a good application of **order statistics** and **coordinate compression** patterns, solved efficiently with a **Fenwick Tree (Binary Indexed Tree)** for prefix counting, in a two-pass approach. This strategy helps in efficiently counting the number of elements less than a given value to the left and right of each index, a common requirement in advanced array problems with constraints on both sides. This pattern is broadly applicable to subarray counting and precedence queries, especially with large array sizes.


### Flashcard
Use two Fenwick trees (BIT) or sorted containers: one processes left-to-right counting smaller elements before i, other right-to-left counting smaller after i.

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Merge Sort(#merge-sort), Ordered Set(#ordered-set)

### Similar Problems
- Count of Smaller Numbers After Self(count-of-smaller-numbers-after-self) (Hard)
- Find All Good Indices(find-all-good-indices) (Medium)