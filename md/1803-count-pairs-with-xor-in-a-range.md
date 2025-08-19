### Leetcode 1803 (Hard): Count Pairs With XOR in a Range [Practice](https://leetcode.com/problems/count-pairs-with-xor-in-a-range)

### Description  
Given an integer array **nums** and two integers **low** and **high**, count the number of pairs (i, j) such that 0 ≤ i < j < n and the XOR of nums[i] and nums[j] falls in the range [low, high].  
In other words, count pairs (i, j) where low ≤ (nums[i] ⊕ nums[j]) ≤ high.

### Examples  

**Example 1:**  
Input: `nums = [1,4,2,7]`, `low = 2`, `high = 6`  
Output: `6`  
*Explanation: The pairs and their XOR values:  
(0,1): 1⊕4=5, ✔  
(0,2): 1⊕2=3, ✔  
(0,3): 1⊕7=6, ✔  
(1,2): 4⊕2=6, ✔  
(1,3): 4⊕7=3, ✔  
(2,3): 2⊕7=5, ✔  
All 6 pairs are in [2,6].*

**Example 2:**  
Input: `nums = [9,8,4,2]`, `low = 5`, `high = 10`  
Output: `2`  
*Explanation:  
(0,3): 9⊕2=11 (not counted)  
(0,2): 9⊕4=13 (not counted)  
(0,1): 9⊕8=1 (not counted)  
(1,2): 8⊕4=12 (not counted)  
(1,3): 8⊕2=10, ✔  
(2,3): 4⊕2=6, ✔  
So only (1,3) and (2,3) are valid.*

**Example 3:**  
Input: `nums = [2,2]`, `low = 0`, `high = 1`  
Output: `0`  
*Explanation:  
(0,1): 2⊕2=0, ✔ (but range is [0,1])  
Ah, 2⊕2=0 is actually in range, so Output should be `1`.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each pair (i, j) where 0 ≤ i < j < n, compute nums[i]⊕nums[j] and check if it's in [low, high]. Time: O(n²). This will be too slow for large n (up to 10⁵).
- **Optimization:**  
  - We notice that for each number as we iterate, we want to know, among numbers before it, how many will provide a XOR in [low, high].
  - This is similar to prefix-sum XOR queries, but since XOR is not monotonic, typical prefix-sum tricks don't work.
  - But for **efficient counting of “how many previous numbers have a required XOR”**, we can use a **Trie** (also called 0-1 Trie, or prefix tree).
    - Insert all numbers seen so far into a bitwise Trie.
    - For each new number, count in the Trie how many numbers have XOR < bound.
    - Do this for high+1 (“≤ high”) and low (“< low”), and subtract to get count in range.
    - Trie depth can be fixed to 14-15 bits (since 10⁵ ≤ n ≤ 2×10⁴ ≤ value < 2¹⁴).
  - This reduces each insert/query to O(Trie height), and so full solution to O(n × L), where L ≈ 15 (bit length).

### Corner cases to consider  
- Array is empty, or has only one element → No valid (i, j), so answer is 0.
- All numbers are the same vs. all unique.
- The range [low, high] either includes or excludes 0 (since XOR with self is zero).
- low > high → Always 0 valid pairs.
- All possible XORs are outside [low, high].

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = [None, None]  # children[0], children[1]
        self.count = 0  # number of elements passing through this node

class Solution:
    def countPairs(self, nums, low, high):
        # Helper to count #pairs with a number 'num' whose XOR < bound in Trie
        def count_with_limit(num, limit):
            curr = root
            res = 0
            for i in reversed(range(15)):  # Maximum needed bits for nums[i] ≤ 2×10⁴
                if not curr:
                    break
                bit_n = (num >> i) & 1
                bit_l = (limit >> i) & 1
                if bit_l == 1:
                    # If limit's bit is 1, two options:
                    # - Take numbers in Trie with bit == bit_n (which makes result 0 for this bit), add their count
                    # - Then proceed down the other branch (bit 1 - bit_n)
                    if curr.children[bit_n]:
                        res += curr.children[bit_n].count
                    curr = curr.children[1 - bit_n]
                else:
                    curr = curr.children[bit_n]
            return res

        root = TrieNode()
        ans = 0
        for num in nums:
            count_high = count_with_limit(num, high + 1)
            count_low = count_with_limit(num, low)
            ans += count_high - count_low
            # Insert num into Trie
            node = root
            for i in reversed(range(15)):
                bit = (num >> i) & 1
                if not node.children[bit]:
                    node.children[bit] = TrieNode()
                node = node.children[bit]
                node.count += 1
        return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L), where n is array length, L ≈ 15 (number of bits).  
  For each of n numbers, two trie queries and one insert, each O(L).
- **Space Complexity:** O(n × L) worst case (every prefix is unique in trie), but usually much less in practice.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers could be up to 2³¹?  
  *Hint: How does the height of the trie affect time and space? Would you need a 32-level trie?*

- How would you solve it if the range queries (low, high) change frequently and you need to handle multiple queries efficiently?  
  *Hint: Can you preprocess nums for all possible queries? Are there data structures for efficient XOR range sums?*

- Can you extend this to support online inserts/deletes and answer queries in real-time?  
  *Hint: What if a number is deleted from the array – can you decrement counts in the trie? How does that affect correctness?*

### Summary
Efficient counting of (i, j) pairs with a bitwise constraint is well-suited to the **0-1 Trie** coding pattern, often used for XOR or bitwise range queries. This approach enables O(n × L) complexity compared to brute force O(n²). This bitwise trie technique is common for problems involving queries on prefixes, number of pairs with XOR in a range, maximum XOR subarray, etc., and is a foundational tool for bitwise algorithm questions in interviews.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Trie(#trie)

### Similar Problems
- Count Paths With the Given XOR Value(count-paths-with-the-given-xor-value) (Medium)