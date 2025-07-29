### Leetcode 2450 (Medium): Number of Distinct Binary Strings After Applying Operations [Practice](https://leetcode.com/problems/number-of-distinct-binary-strings-after-applying-operations)

### Description  
You are given a **binary string** `s` of length `n` and an integer `k ≥ 1`.  
At each operation, you can choose **any** substring of length `k` and flip all its bits (changing `0` to `1` and `1` to `0`). You can do this operation **any** number of times and on **any** substrings (possibly overlapping).  
Return the total **number of distinct binary strings** you can obtain (modulo 10⁹ + 7).

### Examples  

**Example 1:**  
Input: `s = "1001", k = 3`  
Output: `4`  
*Explanation: We start with `"1001"`.  
- Do nothing ⇒ `"1001"`  
- Flip substring at index 0 (`"100"`) ⇒ `"0111"`  
- Flip substring at index 1 (`"001"`) ⇒ `"1110"`  
- Flip both at index 0 and 1 ⇒ `"0000"`  
So, total = 4 distinct strings.*

**Example 2:**  
Input: `s = "1100", k = 2`  
Output: `8`  
*Explanation: We have substrings at indices 0, 1, 2.  
Each can be flipped independently, so total distinct strings = 2³ = 8.*

**Example 3:**  
Input: `s = "1", k = 1`  
Output: `2`  
*Explanation: Only one bit.  
- No flip ⇒ `"1"`  
- Flip ⇒ `"0"`  
So, total = 2.*

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force approach:  
Try all possible combinations of flips for every substring of size `k`. But overlap can lead to the same state via different operations, so we need to count the **distinct outcomes** only.

Observe:
- There are `n - k + 1` possible substrings of length `k`.
- Each substring can be flipped or not (independently), so the total combinations of operations is 2⁽ⁿ⁻ᵏ⁺¹⁾.

But, do these lead to all distinct strings?  
Yes, because for a different choice of flips (at each position), the parity of flips applied to any bit is fixed by those choices. That is, each bit is affected by a unique subset of the flip-positions, and all possible combinations of those yield all reachable strings.

Therefore, **the answer is 2^{n-k+1} mod 10⁹+7**.

Why is this optimal?  
- It’s a pure mathematical solution (not based on input string content), so O(1) time (just compute the exponentiation).

### Corner cases to consider  
- `k = 1`: Each bit can be flipped independently. Answer = 2ⁿ.
- `k = n`: Only one substring (the entire string). Answer = 2.
- `k > n`: No substrings are possible. Answer = 1 (the string itself).
- Empty string: Not possible in this problem’s constraints.

### Solution

```python
def countDistinctStrings(s: str, k: int) -> int:
    MOD = 10**9 + 7
    n = len(s)
    # If k > n, no valid substring: only original string possible.
    if k > n:
        return 1
    
    num_substrings = n - k + 1
    # The answer is 2^(num_substrings) % MOD
    return pow(2, num_substrings, MOD)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(num_substrings)) due to fast exponentiation. (Python’s pow handles this efficiently.)
- **Space Complexity:** O(1). Only a constant amount of space is used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the operation cannot be repeated on overlapping substrings?
  *Hint: Consider dependency between flips.*

- What if instead of flipping, you can set the substring to all 1s or all 0s?
  *Hint: It becomes a different combinatorial problem — how many reachable strings per operation?*

- What if the string contains characters other than 0/1 (e.g., ternary string)?
  *Hint: How does flipping generalize for multiple symbols?*

### Summary
This problem is a neat application of **bitmasking and combinatorics**. Every possible combination of flips corresponds to a subset of the allowed substrings, so the total number of distinct outcomes is 2^(n-k+1). This is a classic group action / bit-flip reachability pattern, which appears in questions about toggling states, lights, or switches in combinatorial game problems.