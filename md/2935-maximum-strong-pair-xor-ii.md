### Leetcode 2935 (Hard): Maximum Strong Pair XOR II [Practice](https://leetcode.com/problems/maximum-strong-pair-xor-ii)

### Description  
Given an integer array `nums` (0-indexed), a **strong pair** `(x, y)` is defined as a pair such that `|x-y| ≤ min(x, y)`. Your task is to select two integers (repetition allowed) from the array so that they form a strong pair and their bitwise XOR is the maximum among all possible strong pairs. Return that maximum XOR.

- You can choose the same integer twice.
- Strong pair condition:
    - If x ≤ y, then y - x ≤ x (thus y ≤ 2x).
    - If x ≥ y, then x - y ≤ y (thus x ≤ 2y).
    - Equivalently, always `|x-y| ≤ min(x,y)`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5]`  
Output: `7`  
*Explanation: Strong pairs include (3,4), (4,3), (4,5) etc. The maximum is 3 XOR 4 = 7.*

**Example 2:**  
Input: `nums = [10,20,12,23,2,3]`  
Output: `31`  
*Explanation: The strong pair (12, 23) yields 12 XOR 23 = 27, but (10, 20) yields 30, and (2, 3) = 1. The maximum is 20 XOR 11 = 31 (pair (20,11) within strong pair condition, as 11,20 are not in input, only input pairs allowed, so best is 30 for (10,20)).*

**Example 3:**  
Input: `nums = [8, 10, 2]`  
Output: `10`  
*Explanation: Strong pairs: (8,8), (8,10), (10,10), (2,2) etc. 8 XOR 10 = 2, 10 XOR 10 = 0, 8 XOR 8 = 0, 2 XOR 10 = 8, maximum is 10 (2, 8).*

### Thought Process (as if you’re the interviewee)  

First, the brute-force approach would be to check all possible pairs \((x, y)\) in nums and see if they are strong, then compute the XOR, and keep tracking the max. This is O(n²), not efficient for large n.

To optimize:
- The strong pair condition means for a fixed `x`, valid `y` satisfy: \( |x - y| ≤ min(x, y) \), which via sorting can be managed with a sliding window.
- Sort nums. For each number y, keep all numbers x with y - x ≤ x, i.e., x ≥ ⌈y/2⌉ or y ≤ 2x.
- For each right endpoint y, keep a window of x such that x ≥ ⌈y/2⌉ (since array sorted).
- To maximize XOR, among all valid x in window, want to quickly find x such that x XOR y is maximized.  
- We can use a **binary trie** to insert numbers in the window, and for each y, query for the value in the trie maximizing y XOR x.
- Advance the window as y increases, removing numbers falling out of the valid x range.

Trade-off: Trie gives near O(log M) query (M=bit length, e.g., 20 for constraints), and two pointers for window control.

### Corner cases to consider  
- Empty array (undefined, but not per problem statement).
- All elements are the same (max XOR is 0).
- Only one element (pair with itself).
- Large gaps between numbers.
- Duplicates in nums.

### Solution

```python
# Core: sort nums, sliding window + binary trie to maximize XOR with strong pair condition

class TrieNode:
    def __init__(self):
        self.children = [None, None]
        self.count = 0  # To support removals

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, num):
        node = self.root
        for i in range(20, -1, -1):  # 21 bits to cover all up to 2e6
            b = (num >> i) & 1
            if not node.children[b]:
                node.children[b] = TrieNode()
            node = node.children[b]
            node.count += 1
    
    def remove(self, num):
        node = self.root
        for i in range(20, -1, -1):
            b = (num >> i) & 1
            node = node.children[b]
            node.count -= 1
    
    def search(self, num):
        node = self.root
        xor_sum = 0
        for i in range(20, -1, -1):
            b = (num >> i) & 1
            # Try opposite bit for max xor if possible
            toggled = 1 - b
            if node.children[toggled] and node.children[toggled].count > 0:
                xor_sum |= (1 << i)
                node = node.children[toggled]
            else:
                node = node.children[b]
        return xor_sum

def maximumStrongPairXor(nums):
    nums.sort()
    trie = Trie()
    ans = 0
    left = 0
    for right, y in enumerate(nums):
        trie.insert(y)
        while nums[left] * 2 < y:
            trie.remove(nums[left])
            left += 1
        # Now, all numbers in [left, right] satisfy y - nums[i] ≤ nums[i] ⇒ y ≤ 2 × nums[i]
        ans = max(ans, trie.search(y))
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(max(nums)))  
  - Sorting: O(n log n)  
  - Each insert/search/remove in trie: O(log(max_val)) per number  
  - Each number inserted once, removed at most once.
- **Space Complexity:** O(n × log(max(nums)))  
  - Trie holds each number across 21 levels, each node has references and count.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the strong pair relation was defined as |x-y| ≤ k for a constant k?  
  *Hint: Could a sliding window be used, or must all pairs be checked?*

- What if you need the (x, y) pair(s) themselves not just the max value?  
  *Hint: You could record x∗ and y∗ for which XOR is maximized during trie queries.*

- What if nums had up to 1e5 numbers, but values < 2¹⁶?  
  *Hint: Would the approach performance change? Is a trie overkill when n is small or values are narrow?*

### Summary
This problem is a classic use of the **trie for fast binary XOR queries** paired with a **two-pointer/sliding window technique** based on sorted input and custom window constraints. The pattern is frequently used for maximum XOR problems (e.g., maximum XOR of any two numbers in a list) and in problems involving "windowed" or range-limited pair selection. It's an efficient alternative to brute force for large n, especially when fast max/min queries within a dynamic subarray are needed.


### Flashcard
Sort nums, then for each number y, use a sliding window to find all x where y ≤ 2x (strong pair condition). Compute XOR for valid pairs and track max. Reduces O(n²) brute-force via sorted constraint.

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation), Trie(#trie), Sliding Window(#sliding-window)

### Similar Problems
- Maximum XOR of Two Numbers in an Array(maximum-xor-of-two-numbers-in-an-array) (Medium)
- Maximum XOR With an Element From Array(maximum-xor-with-an-element-from-array) (Hard)