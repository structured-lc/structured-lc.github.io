### Leetcode 3307 (Hard): Find the K-th Character in String Game II [Practice](https://leetcode.com/problems/find-the-k-th-character-in-string-game-ii)

### Description  
This problem starts with Alice having a string `'a'`. You are given a list of operations (0/1):
- If the operation is `0`: **Append a copy of `word` to itself** (double the string).
- If the operation is `1`: **For each character in `word`, increment it by one in the alphabet (wrapping `z` to `a`), then append that to the original string**.
Given a number `k`, find the k-th character (1-indexed) in the final string _after all operations_. You should not build the final string explicitly, since it can be **exponentially** large.

### Examples  

**Example 1:**  
Input: `operations=[0,1], k=4`  
Output: `b`  
*Explanation:  
- Start: 'a'  
- operation 0: "a" → "aa"  
- operation 1: For "a", next is "b" ⇒ "aa" + "b" = "aab"  
- k=4 ⇒ Index 3 (0-based): character is 'b'*

**Example 2:**  
Input: `operations=[1,1,0], k=5`  
Output: `d`  
*Explanation:  
- Start: 'a'  
- operation 1: "a" → "ab"  
- operation 1: "ab"→ original: "ab", next letters: "bc" ⇒ "ab" + "bc" = "abbc"  
- operation 0: Double: "abbcabbc"  
- k=5 ⇒ Index 4 (0-based): 'd' (detailed mapping with incremental transformation and doubling)*

**Example 3:**  
Input: `operations=[0,0], k=6`  
Output: `a`  
*Explanation:  
- Start: 'a'  
- operation 0: "a" → "aa"  
- operation 0: "aa" → "aaaa"  
- k=6 ⇒ Index 5: character is 'a'*

### Thought Process (as if you’re the interviewee)  
- The most naive idea would be to simulate all operations and build the string, but the length grows exponentially—it's infeasible for large inputs.
- Key insight: **String growth at each operation follows a pattern**:
    - For operation 0, double the length.
    - For operation 1, length doubles (but *second copy is all next chars*).
- To find the k-th character: We can **reverse-engineer** from k backwards through the operations:
    - At each step, determine if position k comes from the original or from the appended/transformed part.
    - For operation 0:
        - If k ≤ half the current length, it's from the first half, else from the copied half.
    - For operation 1:
        - If k ≤ half the current length, from untransformed, else from transformed characters (and tracking how many increments we've done!).
- At the end, apply all the character increments that happened in the "transformed-copy" branches.
- This idea results in **O(log(k))** time and **O(1)** space.

### Corner cases to consider  
- k is 1 (first character)
- All operations are type 0 (purely doubling)
- All operations are type 1 (continually transform and append)
- k larger than current string length (shouldn't happen by problem constraints)
- Wrapping from 'z' → 'a'
- Multiple increments (possibly exceeding 26)
- Empty operations array

### Solution

```python
def kthCharacter(k, operations):
    n = len(operations)
    # Reverse process, since we want to know, after all ops, where k points to in the original 'a'
    increments = 0
    curr_length = 1  # Start from 'a', length 1

    # First, compute the final string length as it grows with each operation
    lengths = [1]
    for op in operations:
        if op == 0 or op == 1:
            curr_length *= 2
        lengths.append(curr_length)

    # Trace k back through all operations
    k -= 1  # Convert to 0-based index
    for i in range(n-1, -1, -1):  # Go backwards
        curr_length //= 2
        if operations[i] == 0:
            # Just doubled, so if k in second half, move to first half
            if k >= curr_length:
                k -= curr_length
            # Else, do nothing, as it's mapped
        else:
            # Operation 1: first half is original, second is incremented
            if k >= curr_length:
                # Right/second half, so comes from left half but incremented
                k -= curr_length
                increments += 1
            # Else, left half: do nothing

    # Now we're down to 0-th character ('a'), apply increments (wrap around)
    val = ((ord('a') - ord('a')) + increments) % 26
    return chr(ord('a') + val)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + log₂(k)), where N = number of operations. We scan to compute lengths and then reverse. No explicit string simulation.
- **Space Complexity:** O(N), for storing the lengths array (could be reduced to O(1) if we compute on the fly).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet was not just 26 lowercase letters, but unicode or a dynamic set?  
  *Hint: Consider using modular arithmetic and mapping for other character sets.*

- Can you output the substring between the i-th and j-th character efficiently, not just a single character?  
  *Hint: Consider why it's much harder, and if the reversed reduction process can be batched.*

- What if some operations could have a repeat count (e.g., "double 3 times" at once)?  
  *Hint: Think about repeated doubling and its impact on k's trace-back.*

### Summary
This problem is a prime example of the *"reverse-mapping"* pattern on implicitly constructed strings (functional encoding/tree-like expansion). The key is to avoid any full construction and only track indices and operations back to the "origin," aggregating side-effects (character increments). This kind of thinking applies in compressed string decoding, stateful expansion, and various "synthetic" string or tree traversal problems.

### Tags
Math(#math), Bit Manipulation(#bit-manipulation), Recursion(#recursion)

### Similar Problems
- Shifting Letters(shifting-letters) (Medium)