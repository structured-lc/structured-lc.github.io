### Leetcode 3632 (Hard): Subarrays with XOR at Least K [Practice](https://leetcode.com/problems/subarrays-with-xor-at-least-k)

### Description  
Given an integer array `nums` and an integer `k`, return the number of subarrays whose bitwise XOR is **at least** `k`.  
A subarray is a contiguous non-empty sequence of elements from the array.  
The XOR of a subarray is the result of applying the XOR operation to all its elements in order.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3], k = 2`  
Output: `4`  
*Explanation: Subarrays whose XOR ≥ 2 are: [2], [3], [1,2], [2,3].*

**Example 2:**  
Input: `nums = [4, 1, 2, 7], k = 3`  
Output: `7`  
*Explanation: Subarrays whose XOR ≥ 3 are: [4], [4,1], [1,2], [2,7], [4,1,2], [1,2,7], [4,1,2,7].*

**Example 3:**  
Input: `nums = [0, 0, 0], k = 1`  
Output: `0`  
*Explanation: All possible subarray XORs are 0, which is less than 1.*

### Thought Process (as if you’re the interviewee)  
First, I’d consider the brute-force approach:  
- Iterate through all possible subarrays by two indices i and j (for 0 ≤ i < n, i ≤ j < n).  
- For each subarray, compute the XOR and check if it meets the constraint.

But this brute-force method is O(n²), since each subarray requires time to compute the XOR, which isn't scalable for large arrays.

**Optimization:**  
- Notice that prefix XORs can be used to compute the XOR of any subarray in O(1). Let prefixXor[i] be the XOR of nums to nums[i-1]. Then the XOR of nums[l..r] = prefixXor[r+1] XOR prefixXor[l].  
- The challenge is to efficiently count, for each end index r, how many left indices l exist, so that the XOR of the subarray nums[l..r] is ≥ k.
- We need a data structure to count how many prefixXors before r satisfy the condition: (prefixXor[r+1] XOR prefixXor[l]) ≥ k.
- Since k can be any integer, the optimal way is to use a **Trie** storing prefixXors, enabling efficient query: Given current prefixXor, how many previously inserted prefixXors (call it pi) satisfy (prefixXor XOR pi) ≥ k?

**Trie idea in detail:**
- Insert all prefixXor values seen so far into the Trie bit-wise.
- For each current prefixXor, query the Trie: In how many paths does (prefixXor XOR pi) ≥ k hold?  
- This requires understanding the bits of prefixXor, k, and trie traversal logic.

This approach is O(n * W), where W is 32 (since bitwise representation for integers is up to 32 bits for constraints), so it's scalable.

I’ll choose this approach because it optimally reduces brute-force to acceptable performance and leverages bit manipulation and Trie data structure, which are common in XOR/count subarray problems.

### Corner cases to consider  
- Empty array (should return 0, but not possible as per the problem).
- All zeros in array and k > 0 (e.g., nums = [0,0,0], k=1).
- k = 0 (all subarrays are valid as XOR is always ≥ 0).
- Negative numbers? If allowed by constraints (solution still works in signed integer).
- All elements < k (should only get subarrays with multi-elements that reach ≥ k).
- nums with only one element.

### Solution

```python
class TrieNode:
    def __init__(self):
        self.child = [None, None]
        self.count = 0  # number of prefixXors passing through this node

class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    def insert(self, num):
        node = self.root
        for i in reversed(range(32)):  # for each bit from high to low
            bit = (num >> i) & 1
            if not node.child[bit]:
                node.child[bit] = TrieNode()
            node = node.child[bit]
            node.count += 1
            
    def countXorGreaterEqual(self, num, k):
        # For current prefixXor = num, count how many previously inserted prefixXors
        # satisfy (num ^ pi) >= k for all pi in Trie
        node = self.root
        cnt = 0
        for i in reversed(range(32)):
            if not node:
                break
            bit_num = (num >> i) & 1
            bit_k = (k >> i) & 1
            if bit_k == 1:
                # We want to go to the child where (bit_num ^ child_bit) == 0
                # (since 0 >= 1 at iᵗʰ position doesn't satisfy, only 1 does)
                # So add all in current branch where (bit_num ^ 0) == 0 (child_bit == bit_num)
                if node.child[bit_num]:
                    cnt += node.child[bit_num].count
                node = node.child[1 - bit_num]
            else:
                # bit_k == 0: Both outputs (0,1) are >= 0
                node = node.child[bit_num]
        # If node is not None, all sub-tries from here are valid since trailing bits won't make
        # (num ^ pi) < k anymore.
        if node:
            cnt += node.count
        return cnt

def countSubarraysWithXorAtLeastK(nums, k):
    trie = Trie()
    result = 0
    prefixXor = 0
    trie.insert(0)  # base case, XOR of 0 elements
    
    for num in nums:
        prefixXor ^= num
        # Count number of prefixXors, call them pi, where (prefixXor ^ pi) >= k
        result += trie.countXorGreaterEqual(prefixXor, k)
        trie.insert(prefixXor)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 32)  
  For each element, we do insert and query in the trie of O(32) = O(1). So total is O(n).
- **Space Complexity:** O(n × 32)  
  In worst case, each prefixXor is unique, each requiring up to 32 new nodes in the Trie. So O(n) auxiliary space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if asked for subarrays with XOR at most k?
  *Hint: Change the trie count query to sum up where (prefixXor ^ pi) ≤ k.*

- What if negative integers appear in the array?  
  *Hint: Signed-integer representation—make sure 32-bit logic handles both sign and value.*

- Can you adapt this logic to counting subarrays with XOR in a specific range [L, R]?  
  *Hint: Use two queries, one for ≥ L, one for > R, subtract.*

### Summary
The solution applies the *prefix XOR* and *trie counting* pattern, common in "subarray XOR" and "subarray sum" range problems.  
This approach efficiently reduces O(n²) subarray checks to O(n) with bitwise Trie structure, which is a powerful method for problems involving counting pairs or ranges derived via bitwise or prefix computations.  
The Trie + prefix computation pattern is broadly applicable in XOR/range querying challenges.


### Flashcard
Use prefix XOR array to compute subarray XOR in O(1). For each ending position j, count prefix XORs that satisfy the constraint using a hash map or sorted structure.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Trie(#trie), Prefix Sum(#prefix-sum)

### Similar Problems
