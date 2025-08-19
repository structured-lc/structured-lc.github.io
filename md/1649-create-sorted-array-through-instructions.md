### Leetcode 1649 (Hard): Create Sorted Array through Instructions [Practice](https://leetcode.com/problems/create-sorted-array-through-instructions)

### Description  
Given an array of integers called **instructions**, simulate inserting each value from left to right into a new array **nums**, maintaining it in sorted order.  
At each insertion, compute the **cost**, which is the minimum of:
- The count of elements in **nums** that are *strictly less than* the new element, and
- The count of elements in **nums** that are *strictly greater than* the new element.

After all insertions, return the total cost modulo 10⁹ + 7.  
Duplicates are allowed, and elements equal to the inserted value do not affect the cost.

### Examples  

**Example 1:**  
Input: `instructions = [1,5,6,2]`  
Output: `1`  
*Explanation:  
- Insert 1: cost is min(0,0)=0, nums=[1]  
- Insert 5: cost is min(1,0)=0, nums=[1,5]  
- Insert 6: cost is min(2,0)=0, nums=[1,5,6]  
- Insert 2: less=1 (1), greater=2 (5,6); cost=min(1,2)=1, nums=[1,2,5,6]  
Total cost = 0+0+0+1 = 1*

**Example 2:**  
Input: `instructions = [1,2,3,6,5,4]`  
Output: `3`  
*Explanation:  
- Insert 1: cost=0, nums=[1]  
- Insert 2: cost=0, nums=[1,2]  
- Insert 3: cost=0, nums=[1,2,3]  
- Insert 6: cost=0, nums=[1,2,3,6]  
- Insert 5: less=4 (1,2,3,6\(<5\)), greater=1 (6); cost=1  
- Insert 4: less=4 (1,2,3,5), greater=1 (6); cost=1  
Total cost = 0+0+0+0+1+2 = 3*

**Example 3:**  
Input: `instructions = [1,3,3,3,2,4,2,1,2]`  
Output: `4`  
*Explanation: See original problem for details. Duplicates require careful counting; step by step, total cost sums to 4.*

### Thought Process (as if you’re the interviewee)  

Start by considering the naive approach:  
- For each number, count how many existing elements in the sorted array (nums) are less than and greater than it.
- Insertion would be O(n) per element, total O(n²) — too slow for large inputs.

To optimize:  
- Since we always care about the counts of values < x and > x as we build up nums, we need a data structure that can “rank” each number efficiently.
- Binary Indexed Tree (Fenwick Tree) or Segment Tree is perfect since they can both count frequencies in prefix or suffix ranges in O(log M), where M is the max instruction value (instructions[i] ≤ 10⁵).

Key Steps:
1. For each value v in instructions (going left-to-right):
   - Query tree for number of elements < v (`prefix_sum(v-1)`)
   - Query tree for number of elements > v (`total_inserted_so_far - prefix_sum(v)`)
   - Cost is min(lower_count, higher_count)
   - Add to answer, then update tree to add v.
- Finally, return total cost modulo 10⁹ + 7.

Why Fenwick Tree?  
- Array values are ≤ 10⁵, so we can efficiently use an array of size 10⁵+2 for the tree.  
- All queries and updates are O(log M).

Alternatively, segment tree works but is more code. Balanced BST or merge sort variants are also possible but often more wordy.

### Corner cases to consider  
- instructions with all identical numbers (e.g. `[2,2,2,2]`)
- instructions sorted ascending/descending
- Single element input
- Maximum element value at upper bound (10⁵)
- Empty instructions (should not occur due to constraints, but good to check behavior)
- Large input with mixtures of repeated and unique values

### Solution

```python
MOD = 10**9 + 7

class FenwickTree:
    def __init__(self, size):
        self.n = size + 2   # ensure index is large enough (for 1-based indexing)
        self.tree = [0] * self.n

    def update(self, index, delta):
        while index < self.n:
            self.tree[index] += delta
            index += index & -index

    def query(self, index):
        # Returns the prefix sum up to index (inclusive)
        result = 0
        while index > 0:
            result += self.tree[index]
            index -= index & -index
        return result

def createSortedArray(instructions):
    max_val = max(instructions)
    tree = FenwickTree(max_val)
    ans = 0
    for i, val in enumerate(instructions):
        # Fenwick tree is 1-indexed
        less = tree.query(val - 1)
        greater = i - tree.query(val)
        ans = (ans + min(less, greater)) % MOD
        tree.update(val, 1)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log M), where n = len(instructions), M = max(instructions). Each update/query to Fenwick Tree is O(log M).
- **Space Complexity:** O(M), where M is the maximum value in instructions (to allocate the tree array).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if values could be negative or much larger than 10⁵?  
  *Hint: Need to discretize or compress values for use in Fenwick Tree, or use a more general balanced BST.*

- Can you apply the same method using a Segment Tree or Order Statistics Tree?  
  *Hint: Yes, both support range queries for counts, but extra logic/code required.*

- How do you modify your approach to handle streaming data or if insert instructions arrive online?  
  *Hint: Fenwick Tree still works, since all updates/queries are online and incremental.*

### Summary
This problem is a classic example of the “count of elements less-than/greater-than as we process each element” pattern, common in order statistics and “smaller numbers after self” problems. Using a Fenwick Tree enables us to efficiently query and update rank/frequency for each element in log-time, making the approach scalable. This pattern applies broadly to problems involving dynamic counting in sorted order, like inversion counting, data stream median, or frequency ranking.

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Merge Sort(#merge-sort), Ordered Set(#ordered-set)

### Similar Problems
- Count Good Triplets in an Array(count-good-triplets-in-an-array) (Hard)
- Longest Substring of One Repeating Character(longest-substring-of-one-repeating-character) (Hard)
- Sort Array by Moving Items to Empty Space(sort-array-by-moving-items-to-empty-space) (Hard)