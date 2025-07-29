### Leetcode 1734 (Medium): Decode XORed Permutation [Practice](https://leetcode.com/problems/decode-xored-permutation)

### Description  
Given an array `encoded` of length \( n-1 \), you know there was some permutation `perm` of the first \( n \) positive integers (where \( n \) is always odd), and each `encoded[i] = perm[i] XOR perm[i+1]`. Your task is to decode and return the original `perm` array.  
- `perm`: permutation of `[1, 2, ..., n]`  
- `encoded[i] = perm[i] XOR perm[i+1]` for `0 ≤ i < n-1`  
- Return original `perm`. It is guaranteed there is exactly one solution.

### Examples  

**Example 1:**  
Input: `encoded = [3,1]`  
Output: `[1,2,3]`  
*Explanation: perm = [1,2,3], then encoded = [1⊕2, 2⊕3] = [3,1].*

**Example 2:**  
Input: `encoded = [6,5,4,6]`  
Output: `[2,4,1,5,3]`  
*Explanation: perm = [2, 4, 1, 5, 3], so encoded = [2⊕4, 4⊕1, 1⊕5, 5⊕3] = [6,5,4,6].*

**Example 3:**  
Input: `encoded = [2,3,1]`  
Output: `[1,3,2,1]`  
*Explanation: perm = [1,3,2,1] (however, this is not a valid permutation if n=4; n must be odd—actual testcases have n odd and guarantee result is a valid permutation).*

### Thought Process (as if you’re the interviewee)  
First, let's brute force:  
- Try all possible \( n! \) permutations and check for each if their adjacent XOR matches `encoded`.  
- But that is too slow, \( O(n!) \), and won't pass.

Key XOR observations:  
- XOR is reversible: if `a ⊕ b = c`, then `a = b ⊕ c` or `b = a ⊕ c`.
- The only tricky part: recovering the first element. Once you know `perm`, each next element can be recovered as `perm[i+1] = perm[i] ⊕ encoded[i]`.

But how to find `perm`?  
- Notice that all elements in `perm` is every number from 1 to n, so their XOR is `1 ⊕ 2 ⊕ ... ⊕ n` (call this `total`).
- For the rest, since `encoded` is made of `perm[i] ⊕ perm[i+1]`, if you take all encoded at odd indices, and XOR them:  
  - You get `encoded[1] = perm[1] ⊕ perm[2]`, `encoded[3] = perm[3] ⊕ perm[4]`, etc.
  - If you XOR all encoded at odd indices, you end up with all `perm[1], perm[2], ...` etc except `perm` and `perm[n-1]` because of cancellation.
- Actually, the critical trick is:  
  - Compute `total = 1 ⊕ 2 ⊕ ... ⊕ n`
  - Compute `odd = encoded[1] ⊕ encoded[3] ⊕ ... ⊕ encoded[n-2]` (every second element, starting at index 1).
  - `perm = total ⊕ odd` (because in a chain, when you XOR all encoded at odd indices, you end up removing all elements except `perm`).  
- Then, use the formula `perm[i+1] = perm[i] ⊕ encoded[i]` to build up the answer.

### Corner cases to consider  
- Minimum input: encoded of length 2 (so n=3)
- Large n
- All encoded values the same
- Sequential encoded (but permutation non-sequential)
- Only odd n is allowed, so no even n cases.

### Solution

```python
def decode(encoded):
    n = len(encoded) + 1
    # Step 1: XOR all numbers from 1 to n to get 'total'
    total = 0
    for i in range(1, n + 1):
        total ^= i
    
    # Step 2: XOR all encoded values at odd indices (1, 3, 5, ...) to get 'odd'
    odd = 0
    for i in range(1, n - 1, 2):
        odd ^= encoded[i]
    
    # Step 3: The first element of perm is total XOR odd
    perm = [total ^ odd]
    
    # Step 4: Recover the rest of the permutation
    for val in encoded:
        # perm[i+1] = perm[i] XOR encoded[i]
        perm.append(perm[-1] ^ val)
    
    return perm
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) since we iterate over the arrays at most a few times proportional to their length.
- **Space Complexity:** O(n) for building the output permutation array.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do this with O(1) extra space?
  *Hint: In-place fill of perm array if allowed, or clever pointer manipulation.*

- If n can be even, is there always a unique solution?
  *Hint: Some information is lost for even n—try to prove or disprove uniqueness.*

- What if encoded is invalid or has duplicates—how can you validate the input?
  *Hint: Confirm the reconstructed perm is a permutation of 1..n, and check input constraints.*

### Summary
This is a classic bit manipulation problem leveraging the properties of XOR and the uniqueness of permutations. By using the cumulative XOR trick and rebuilding with prefix XORs, we recover the permutation in O(n) time and space. This pattern—recovering data by exploiting XOR chain properties and information redundancy—is useful in problems involving hidden state encoding, cryptography, or prefix-suffix computations.