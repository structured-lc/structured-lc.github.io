### Leetcode 3267 (Hard): Count Almost Equal Pairs II [Practice](https://leetcode.com/problems/count-almost-equal-pairs-ii)

### Description  
Given an array of positive integers nums, count the number of index pairs (i, j) with i < j such that nums[i] and nums[j] are *almost equal*.  
Two numbers x and y are *almost equal* if you can make them equal by swapping any two digits within one of them at most twice (so, you can swap in x up to 2 times, or swap in y up to 2 times, or not swap at all).  
Leading zeros are allowed after swaps.

### Examples  

**Example 1:**  
Input: `nums = [123, 132, 321]`  
Output: `3`  
*Explanation: Every pair can be turned into each other with at most two swaps:  
- 123 �� 132 (swap 2 and 3)  
- 123 �� 321 (swap 1 and 3, then 2 and 1)  
- 132 �� 321 (swap 1 and 3, then 2 and 3)*

**Example 2:**  
Input: `nums = [100, 10, 1]`  
Output: `0`  
*Explanation: No two numbers can be rearranged by at most two swaps to make them the same, so no pairs.*

**Example 3:**  
Input: `nums = [110, 101, 110]`  
Output: `3`  
*Explanation:  
- (0,1): 110 → 101 (swap positions 1 and 2)  
- (0,2): already equal  
- (1,2): 101 → 110 (swap positions 1 and 2)*


### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  For each pair (i, j), try all possible pairs of up to two swaps in either number, checking if the numbers can become equal. This approach is exponential due to all permutations and not efficient.

- **Optimize:**  
  Observe: For a k-digit number, you can reach any permutation within at most 2 swaps only if the permutation differs from the original number in ≤4 positions (since each swap can fix 2 indices).  
  So, for two numbers to be "almost equal", their digits must match except in ≤4 places.  

  Instead of brute-force, for each number:
  - Enumerate all numbers that can be formed from it by at most 2 swaps (including itself).
  - Use a map/dictionary to count how many times you've seen each such "variant" so far.
  - For each number, the count of almost equal previous numbers is the sum of counts of its variants so far.

  This is feasible since k (number of digits) is small (≤7 in constraints). For each number, the maximum possible variants by up to 2 swaps is still manageable (less than 300 possible forms).

- **Trade-offs:**  
  - Storing and checking all variants may take more space, but it’s acceptable due to the small number of possibilities per number.
  - Enumeration is necessary because the set of almost equal forms is more than just the set of all permutations, but can be efficiently listed by nested loops.


### Corner cases to consider  
- Array with only one element.
- All elements identical.
- Elements with different number of digits (e.g. 1 and 01).
- Numbers that cannot possibly match even with swaps, e.g. different digit counts.
- Numbers with repeated digits or leading zeros.
- Very large n for performance.


### Solution

```python
def countAlmostEqualPairs(nums):
    from collections import defaultdict

    # Helper to generate all numbers within at most 2 swaps (as strings)
    def generate_variants(num_str):
        seen = set()
        k = len(num_str)
        # No swap: identity
        seen.add(num_str)
        # 1-swap: swap any two indices once
        for i in range(k):
            for j in range(i+1, k):
                arr1 = list(num_str)
                arr1[i], arr1[j] = arr1[j], arr1[i]
                seen.add(''.join(arr1))
        # 2-swaps: swap i↔j, then k↔l (order matters! must allow i/j overlap with k/l)
        for i1 in range(k):
            for j1 in range(i1+1, k):
                arr1 = list(num_str)
                arr1[i1], arr1[j1] = arr1[j1], arr1[i1]
                for i2 in range(k):
                    for j2 in range(i2+1, k):
                        arr2 = arr1[:]
                        arr2[i2], arr2[j2] = arr2[j2], arr2[i2]
                        seen.add(''.join(arr2))
        return seen

    counter = defaultdict(int)
    res = 0

    for num in nums:
        s = str(num)
        variants = generate_variants(s)
        # For every variant formed from this number, accumulate total previously seen
        for v in variants:
            res += counter[v]
        # Now this number can be used by future numbers, so add to counter
        counter[s] += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** For n numbers, and each number of length k (≤7), we generate all variants for up to 2 swaps, which is at most O(k⁴) per number. For n=10⁵, k=7, this is roughly O(100,000 × 300). Worst-case O(n × k⁴), but constants are small.
- **Space Complexity:** O(n × k!), since in extreme case all numbers are unique and each can generate up to k! variants, but practical space is well below this due to variant overlap and k is small.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle numbers of different lengths?  
  *Hint: Numbers of different length cannot be made equal even with swaps, so you can group by length before computing variants.*

- If allowed up to three swaps, how would that change your approach?  
  *Hint: The number of possible variants increases; enumerate all numbers within 3 swaps, but for k≤7 it's still feasible.*

- Can you optimize if almost all nums are the same?  
  *Hint: Use group counting for identical numbers; for all identical values, count number of index pairs directly.*

### Summary
This problem uses the pattern of *enumerate all nearby states in a small local space* and counting using hashing, commonly seen in permutation-variant or transform-a-bit-problem interview types when the transform space is small. The solution uses efficient enumeration and mapping—similar to fingerprints, anagrams, or almost-equal string problems. This approach and pattern also apply to certain "at most k edits" or "reachable by swaps" problems.