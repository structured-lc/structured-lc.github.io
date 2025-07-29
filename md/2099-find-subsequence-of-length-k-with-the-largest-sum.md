### Leetcode 2099 (Easy): Find Subsequence of Length K With the Largest Sum [Practice](https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum)

### Description  
Given an integer array `nums` and an integer `k`, find a subsequence (not necessarily contiguous) of length `k` that has the largest possible sum, while maintaining the elements’ original relative order from the input array.

### Examples  

**Example 1:**  
Input: `nums = [2,1,3,3], k = 2`  
Output: `[3,3]`  
*Explanation: The two largest numbers are both 3. Their indices are 2 and 3, and picking them preserves the order.*

**Example 2:**  
Input: `nums = [-1,-2,3,4], k = 3`  
Output: `[-1,3,4]`  
*Explanation: The three largest numbers are 3, 4, and -1. Their original order in nums is -1, 3, 4, so the output is [-1,3,4].*

**Example 3:**  
Input: `nums = [3,4,3,3], k = 2`  
Output: `[4,3]`  
*Explanation: The two largest are 4 (index 1) and a 3. The leftmost 3 (index 2) appears after the 4, so [4,3] is produced.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Generate all subsequences of length k, sum each, and pick the one with the largest sum. Clearly, this is not practical as the number of such subsequences is large: C(n, k).
- **Observation:** The problem really asks: “Which k elements of nums, if we pick them in their original order, yield the largest total?”
- **Optimized plan:**
  1. Find the k largest elements. We need their original indices so the result is in array order.
  2. Pair each element with its index: [(index, num)].
  3. Sort all (index, num) pairs by num (descending), pick the top k pairs.
  4. To maintain order, sort these k pairs by their original index (ascending).
  5. Collect their values for the answer.

- **Why not just sort?** Simply sorting loses index info; we need the original order in the answer.

### Corner cases to consider  
- All numbers are equal (e.g., [5,5,5], k=2)
- k equals length of nums (should return nums as-is)
- k is 1 (pick max element, but maintain leftmost in tie)
- nums contains negative numbers and/or zeros
- nums contains duplicates, both in and out of the top k
- Array is very small (length 1, k=1)
- Multiple elements tie for the kth largest value

### Solution

```python
def maxSubsequence(nums, k):
    # Pair each number with its original index
    indexed = []
    for idx, num in enumerate(nums):
        indexed.append((num, idx))

    # Sort by value descending to get largest k elements
    indexed.sort(key=lambda x: -x[0])

    # Take only the top k (value, index) pairs
    top_k = indexed[:k]

    # Sort these back by index to preserve original relative order
    top_k.sort(key=lambda x: x[1])

    # Extract only the values for the result
    return [num for num, idx in top_k]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is len(nums).
  - O(n) to pair with indices.
  - O(n log n) to sort by value.
  - O(k log k) to sort the top k by their indices (since k ≤ n, dominated by n log n).
- **Space Complexity:** O(n) for storing index-value pairs and O(k) extra for answer.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is extremely large and you want to optimize for memory?  
  *Hint: Use a min-heap of size k to avoid sorting the entire array.*

- Can you do this in linear time for very small k?  
  *Hint: Can you keep track of top k values during a single pass?*

- How would you adapt the solution if the order does not matter?  
  *Hint: Just pick the k largest values, no index/relative order logic needed.*

### Summary
This is a classic **greedy/priority queue** problem focused on selecting the top k elements by value, then restoring their input order. The pairing of value with index ensures subsequence order, which is a common pattern for “largest k but keep ordering” style tasks. This approach also appears in problems like "Top K Frequent Elements with Ties" or “Sliding Window Maximum.”