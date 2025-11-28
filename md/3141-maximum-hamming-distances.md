### Leetcode 3141 (Hard): Maximum Hamming Distances [Practice](https://leetcode.com/problems/maximum-hamming-distances)

### Description  
Given an integer array **nums** and an integer **m** (where each `0 ≤ nums[i] < 2ᵐ`), for each element **nums[i]**, compute the **maximum Hamming distance** between it and any other element in the array.  
The *Hamming distance* between two numbers is the number of bit positions where they differ (use m bits, with leading zeros as needed).

### Examples  

**Example 1:**  
Input: `nums = [1, 2], m = 2`  
Output: `answer = [2, 2]`  
*Explanation: Hamming distance between 1 (01₂) and 2 (10₂) is 2 in 2 bits. For each, the maximum (and only) distance is 2.*

**Example 2:**  
Input: `nums = [0, 3, 2], m = 2`  
Output: `answer = [2, 2, 2]`  
*Explanation:  
0 (00₂) vs 3 (11₂): 2  
0 (00₂) vs 2 (10₂): 1  
3 (11₂) vs 2 (10₂): 1  
So for each, the max is 2.*

**Example 3:**  
Input: `nums = [5, 9, 12], m = 4`  
Output: `answer = [4, 4, 4]`  
*Explanation:  
5 (0101₂) vs 9 (1001₂): 2  
5 vs 12 (1100₂): 3  
9 vs 12: 2  
But the *complement* technique (see below) ends up giving max possible Hamming distance (since 5 vs 10, 9 vs 6, 12 vs 3) — see full algorithm.*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  For each element x, compare with every other y in nums, count bit positions where x≠y. This takes O(n² \* m) time—too slow for large n.

- **Optimized approach (Reverse + BFS):**  
  Realize that *max* Hamming distance for x is achieved when comparing to the "most different" y in nums.  
  - For a number x, its *bitwise complement* (\(\sim x, m\) bits) is the most dissimilar possible.
  - If that complement isn't actually in nums, then we look for the next best: What is the **minimum Hamming distance** between x’s complement and any number y in nums?
  - The *maximum* achievable Hamming distance for x is:  
    max_distance = m - (minimum distance from complement of x to nums)
  - Efficiently find the minimum Hamming distance to any element in nums for all 2ᵐ possible numbers using BFS:
    - Start with all numbers in nums, label their distance as 0, and do BFS flipping each bit (so neighboring nodes are at Hamming distance +1).
    - For each number, store its min distance to any original nums element.
    - For each original nums[i], compute answer[i] = m - dist[complement(nums[i])].
  - Tradeoff: O((n + 2ᵐ) × m) time and O(2ᵐ) space, but fast for small m (e.g. m ≤ 20).

### Corner cases to consider  
- nums of length 1 (no other element to compare with, conventionally answer is 0)
- Repeated numbers (should be handled the same, ignore comparing with self)
- All elements equal (distance 0 for all)
- m = 1 (smallest possible bitwidth)
- Single bit differences
- Large m (watch 2ᵐ space/time blowup)
- nums may not include complements of any elements

### Solution

```python
def max_hamming_distances(nums, m):
    # Step 1: Prepare BFS queue and distances
    size = 1 << m          # All numbers representable in m bits
    dist = [-1] * size     # dist[x]: min #bit flips from any nums element to x
    from collections import deque

    q = deque()
    for x in nums:
        if dist[x] == -1:  # Only queue unique nums
            dist[x] = 0
            q.append(x)

    # Step 2: BFS to fill dist[] array
    while q:
        cur = q.popleft()
        for i in range(m):
            nei = cur ^ (1 << i)   # Flip iᵗʰ bit
            if dist[nei] == -1:
                dist[nei] = dist[cur] + 1
                q.append(nei)

    # Step 3: For each number, maximum Hamming distance is m - dist[complement]
    mask = (1 << m) - 1
    answer = []
    for x in nums:
        complement = x ^ mask
        max_dist = m - dist[complement]
        answer.append(max_dist)

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + 2ᵐ) × m)
  - Each node (up to 2ᵐ) visited at most once; from each, try m-bit flips.
  - Initial setup: O(n)
  - BFS expands O(2ᵐ) nodes each with m neighbors.
- **Space Complexity:** O(2ᵐ)
  - For dist[] array and queue, up to all 2ᵐ numbers.
  - Output uses O(n) extra.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this when m is very large (e.g. m = 30)?
  *Hint: How does the 2ᵐ bound impact feasibility? Can you bucket numbers by populations?*

- How would you handle dynamic queries (insert/remove/ask max Hamming for x)?
  *Hint: Would a trie or bitmask Set help for such lookups?*

- Could you find the *pair* of numbers from nums with maximum mutual Hamming distance?
  *Hint: Try all pairs, or use properties of bit manipulations and spreads.*

### Summary
This problem uses a rare but clever **reverse BFS + bitmasking** strategy: instead of scanning every pair, we use BFS from all actual nums elements, propagating *bit-flip distances* in Hamming space to precompute minimum distances to all possible combinations.  
The final answer is derived by a complement trick. This BFS-on-bitmasks pattern is powerful in bit manipulation problems—can apply in searching shortest bit-reachability, code word channels (error correction), and other max/min Hamming distance problems.


### Flashcard
For each number x, its max Hamming distance is achieved with its bitwise complement; if complement not in nums, find closest alternative via BFS on bit flips.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Breadth-First Search(#breadth-first-search)

### Similar Problems
