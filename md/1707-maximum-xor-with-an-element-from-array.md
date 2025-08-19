### Leetcode 1707 (Hard): Maximum XOR With an Element From Array [Practice](https://leetcode.com/problems/maximum-xor-with-an-element-from-array)

### Description  
Given an array **nums** of non-negative integers and an array **queries** where each query is of the form [x, m]:  
For each query, return the largest possible XOR value of x with any element in **nums** that is at most m.  
If every number in **nums** is greater than m, return -1 for that query.

Example:  
If nums = [0,1,2,3,4] and query = [3, 1],  
only 0 and 1 are not greater than 1, so consider 3 ⊕ 0 and 3 ⊕ 1;  
return the maximum.

### Examples  

**Example 1:**  
Input: `nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]`  
Output: `[3,3,7]`  
*Explanation:*
- For [3,1]: Only 0 and 1 can be used. 3⊕0=3, 3⊕1=2 → max=3  
- For [1,3]: 0,1,2,3 allowed. Best is 1⊕2=3  
- For [5,6]: All nums allowed, best is 5⊕2=7  

**Example 2:**  
Input: `nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]`  
Output: `[15,-1,5]`  
*Explanation:*
- [12,4]: Can use 2,3,4. 12⊕4=8, 12⊕3=15, 12⊕2=14 → max=15  
- [8,1]: Only use 1 or less, which is not in nums → -1  
- [6,3]: Use 2,3. 6⊕2=4, 6⊕3=5 → max=5  

**Example 3:**  
Input: `nums = [10,15], queries = [[12,10],[1,10]]`  
Output: `[6,11]`  
*Explanation:*
- [12,10]: Only 10 allowed. 12⊕10=6  
- [1,10]: 1⊕10=11  

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each query, filter nums for numbers ≤ m, and take max of x⊕num for each. If nums is large, this is too slow (O(QN)).
- **Optimization:**  
  - Since both nums and queries can be large, we need a way to *efficiently* find the max XOR of x and any eligible num ≤ m.
  - **Trie optimization:**  
    - Insert numbers ≤ m from nums into a bitwise Trie (0-1 Trie).
    - For each query, query Trie for best XOR with x, as in "Maximum XOR of Two Numbers in an Array".
    - As m increases (as queries processed in sorted m order), add more nums into Trie.
    - Sort queries and nums, process increasing m to maintain Trie contents.

- This approach gives O(N log N + Q log Q + (N+Q) × bit_length) time (efficient for large inputs).
- **Trade-offs:** Slightly more code for Trie logic, but necessary for performance.

### Corner cases to consider  
- Empty nums or queries.
- No nums ≤ mi for a query (should return -1 for that query).
- Duplicate nums or queries.
- Large x (even larger than all nums), or x=0.
- All nums > mi.
- m=0 and nums has 0.
- nums or query x with maximum possible value (10⁹).

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = [None, None]

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    # Insert a single number into Trie (bitwise)
    def insert(self, num):
        node = self.root
        # put 31 bits since nums[i] ≤ 10⁹
        for i in range(30, -1, -1):
            bit = (num >> i) & 1
            if not node.children[bit]:
                node.children[bit] = TrieNode()
            node = node.children[bit]
    
    # Find the best possible XOR of x with any number in the Trie
    def max_xor(self, x):
        node = self.root
        if not node.children[0] and not node.children[1]:
            return -1  # trie is empty
        res = 0
        for i in range(30, -1, -1):
            bit = (x >> i) & 1
            toggled_bit = 1 - bit
            if node.children[toggled_bit]:
                res |= (1 << i)
                node = node.children[toggled_bit]
            else:
                node = node.children[bit]
        return res

def maximizeXor(nums, queries):
    # Sort nums for two pointer and sort queries by mi
    nums.sort()
    n = len(nums)
    # Store original query index to place answers correctly
    queries_enumerated = [(x, m, idx) for idx, (x, m) in enumerate(queries)]
    queries_enumerated.sort(key=lambda q: q[1])  # sort by mi

    answer = [0] * len(queries)
    trie = Trie()
    j = 0  # pointer to nums

    for x, m, idx in queries_enumerated:
        # Insert nums into Trie as long as nums[j] ≤ mi
        while j < n and nums[j] <= m:
            trie.insert(nums[j])
            j += 1
        if j == 0:
            answer[idx] = -1  # nothing inserted for this mi
        else:
            answer[idx] = trie.max_xor(x)
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting nums: O(N log N)
  - Sorting queries: O(Q log Q)
  - Inserting each num: Each at most once, and insert is O(31) = O(1) per num, so O(N).
  - For queries: Each query O(31), total O(Q)
  - Overall: O(N log N + Q log Q + N + Q) → O(N log N + Q log Q)
- **Space Complexity:**  
  - Trie: Each bit per inserted num, O(31*N) = O(N) (since each num is at most 31 bits).
  - Output: O(Q)
  - Total: O(N + Q)

### Potential follow-up questions (as if you’re the interviewer)  

- What if the range of mi per query can be very small or very large?  
  *Hint: Think about how dynamic insertion into the Trie can accommodate this efficiently, and why a static approach (like precomputing entire range) might be too much.*

- If you had to support insertions and deletions from nums on the fly, how would you change your data structure?  
  *Hint: A Trie that counts number of numbers passing through each node. When deleting, decrement counts.*

- Can this be solved if you query for ALL possible XORs ≤ m instead of just maximum?  
  *Hint: Consider augmenting the Trie with prefix sums, or whether this changes the time bounds fundamentally.*

### Summary
This problem uses a *bitwise Trie* (binary prefix tree) to efficiently find the maximum XOR with constraints.  
This tree-based pattern is common for bitmask and XOR maximization over dynamic or filtered sets, especially for "all-pairs" queries with constraints. This pattern also appears in "Maximum XOR of Two Numbers in an Array" and similar bitwise search problems.  
Key idea: Reduce per-query work to O(bit-length), use sorting for efficient eligibility, and process in two-pointer style to maintain optimal Trie state for each query.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Trie(#trie)

### Similar Problems
- Maximum XOR of Two Numbers in an Array(maximum-xor-of-two-numbers-in-an-array) (Medium)
- Maximum Genetic Difference Query(maximum-genetic-difference-query) (Hard)
- Minimize XOR(minimize-xor) (Medium)
- Maximum Strong Pair XOR I(maximum-strong-pair-xor-i) (Easy)
- Maximum Strong Pair XOR II(maximum-strong-pair-xor-ii) (Hard)