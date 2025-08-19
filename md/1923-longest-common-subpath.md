### Leetcode 1923 (Hard): Longest Common Subpath [Practice](https://leetcode.com/problems/longest-common-subpath)

### Description  
Given `m` friends, each traveling along a sequence of cities (numbered from 0 to n-1), each represented as a list called `paths[i]`. A **subpath** is any contiguous segment of a path.  
Find the **length** of the longest subpath that appears in **every** friend's path (i.e., the longest sequence of consecutive cities that is a subpath of all the lists).

### Examples  

**Example 1:**  
Input: `n = 5, paths = [[0,1,2,3,4], [2,3,4], [4,0,1,2,3]]`  
Output: `2`  
*Explanation: The longest common subpath is `[2,3]`. It appears in all input lists as a contiguous segment.*

**Example 2:**  
Input: `n = 3, paths = [[0,1,2], [1,2,0], [2,0,1]]`  
Output: `1`  
*Explanation: The only common subpaths are single cities, i.e., ``, `[1]`, or `[2]`.*

**Example 3:**  
Input: `n = 4, paths = [[1,2,3,1], [2,3,1,2], [3,1,2,3]]`  
Output: `2`  
*Explanation: `[2,3]` and `[3,1]` both appear as contiguous subpaths in all given paths. Any subpath of length greater than 2 cannot be found in every path.*


### Thought Process (as if you’re the interviewee)  
- Start with a brute-force idea:  
  For every possible subpath length `k` from 1 up to the minimum path length, check all possible subpaths of length `k` in the first path, and then check if these subpaths exist in every other path.

- Brute-force is not feasible:  
  The number of possible subpaths is enormous (O(L²) per path, with L up to 10⁵), checking their existence in all paths is far too slow.

- Optimize using **Binary Search**:  
  The problem asks for the largest possible subpath length, so can use binary search on the subpath length `k`, and check for each length whether a common subpath exists.

- For each binary search step (checking subpath of length `k`),  
  use a **rolling hash** (such as Rabin-Karp) to hash all subpaths of length `k` in each path, and find the intersection between all sets — if any subpath hash exists in all, then there is a common subpath of length `k`.

- For efficiency (avoiding hash collisions), use large moduli or double hashing.

- Chosen approach: **Binary search for length, and rolling hash for checking**.  
  This approach is efficient, scales to large input sizes, and is commonly accepted for substring/subarray intersection problems.

### Corner cases to consider  
- A single path: The entire path should be the answer.
- All paths are completely identical: Result is the minimum path length.
- All paths have no common city: Answer is 0.
- A common city but not any longer subpath: Single-length answer.
- Path with only one element.
- Empty paths (usually not allowed by constraints, but good to check).
- Large value of `n` and very long paths to ensure time efficiency.

### Solution

```python
from typing import List

def longestCommonSubpath(n: int, paths: List[List[int]]) -> int:
    # Helper function to check if there is a common subpath of length k
    def check(k):
        B1, M1 = 100_001, 10 ** 11 + 19
        B2, M2 = 100_003, 10 ** 11 + 21
        
        common = None
        pow1, pow2 = [1], [1]
        for _ in range(k):
            pow1.append((pow1[-1] * B1) % M1)
            pow2.append((pow2[-1] * B2) % M2)
        
        for idx, path in enumerate(paths):
            hashes = set()
            h1, h2 = 0, 0
            for i, x in enumerate(path):
                h1 = (h1 * B1 + x) % M1
                h2 = (h2 * B2 + x) % M2
                if i >= k:
                    h1 = (h1 - path[i-k]*pow1[k]) % M1
                    h2 = (h2 - path[i-k]*pow2[k]) % M2
                if i >= k - 1:
                    hashes.add((h1, h2))
            if common is None:
                common = hashes
            else:
                common &= hashes
            if not common:
                return False
        return True

    min_len = min(len(path) for path in paths)
    left, right = 0, min_len
    while left < right:
        mid = (left + right + 1) // 2
        if check(mid):
            left = mid
        else:
            right = mid - 1
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n × log n)  
  - m = number of paths, n = average length of paths.
  - For each binary search step (log n), process every path with a rolling hash (O(n) per path).

- **Space Complexity:**  
  O(m × n) in total worst case for all subpath hash storage, but at each step, only unique hash sets are stored for the current length `k`.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the approach if paths are no longer arrays of numbers but instead arrays of strings (e.g. city names)?
  *Hint: Use the same hashing strategy but hash string values.*

- What if the input paths are extremely long (e.g. millions of cities), is there a way to optimize even further?
  *Hint: Consider sparse hashing, compressed data structures, or early pruning.*

- How can you reduce the probability of hash collisions in this method?
  *Hint: Use double hashing or strong primes for modulus.*

### Summary
This problem utilizes the **binary search on answer** + **rolling hash (Rabin-Karp)** pattern, a powerful approach for substring/subarray intersection-type problems. This solution is memory- and runtime-optimized, and similar ideas can be applied in problems like finding longest common substring, sequence intersection, or duplicate substring finding in multiple sequences or strings.

### Tags
Array(#array), Binary Search(#binary-search), Rolling Hash(#rolling-hash), Suffix Array(#suffix-array), Hash Function(#hash-function)

### Similar Problems
- Reconstruct Itinerary(reconstruct-itinerary) (Hard)
- Maximum Length of Repeated Subarray(maximum-length-of-repeated-subarray) (Medium)