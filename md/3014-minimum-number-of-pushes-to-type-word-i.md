### Leetcode 3014 (Easy): Minimum Number of Pushes to Type Word I [Practice](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i)

### Description  
Given a string `word` consisting of **distinct lowercase English letters**, imagine you have a telephone keypad (keys 2-9).  
You can assign letters to keys in any order, but **each key can hold at most 8 letters**.  
To type a letter, you must push the key repeatedly: for the kᵗʰ letter on a key, you push the key k times.  
**Return the minimum number of pushes needed to type `word`**.

### Examples  

**Example 1:**  
Input: `word = "abc"`  
Output: `6`  
*Explanation: You can put all 3 letters on one key. To type: a, b, c ⇒ 1 + 2 + 3 = 6.*

**Example 2:**  
Input: `word = "abcdefghi"`  
Output: `17`  
*Explanation: 8 letters on key 1 (cost = 1 + 2 + ... + 8 = 36), 1 letter on key 2 (cost = 1), but to minimize pushes, split such that 8 on one key (cost 36) and extra letters on next key (cost 9 for the 1st key + 1 for the 2nd key is not optimal). But since each subsequent batch costs more, best is: 8×1 + 1×2 = 10.*

**Example 3:**  
Input: `word = "abcdefghijk"`  
Output: `18`  
*Explanation: Assign 8 letters to the first key (cost = 8×1 = 8), 3 to the next (cost = 3×2 = 6), total = 8 + 6 = 14. But since pushes for each letter increase per key, total = 8×1 + 3×2 = 14 (and not the sum of k for each letter). The key: For every set of 8, pushes increase by 1. So: ⌊n/8⌋ full batches at increasing cost, leftovers count at the next cost.*

### Thought Process (as if you’re the interviewee)  
Start by observing the pattern:
- Each key can hold up to 8 letters, and push cost per letter increases based on its position on the key: kᵗʰ letter on key costs k pushes.
- You can assign letters to keys in any way, so **to minimize total pushes, fill one key completely before moving to the next**.

Brute-force:
- Try all possible distributions — very inefficient due to factorial possibilities.

Optimized approach:
- The **best way** is to fill one key with up to 8 letters (cost: 1×8), the next key (cost: 2×8), etc.
- For word of length n:
    - For each complete batch of 8 letters, the number of pushes per letter increases by 1.
    - For leftovers: multiply count by pushes needed.

Trade-off:
- This approach provides O(n) time, and is optimal, as breaking up a batch would only increase the per-letter push cost.

### Corner cases to consider  
- Empty string: word = "" ⇒ output = 0  
- Length ≤ 8: all on one key  
- Lengths: exactly multiples of 8  
- Letters: All distinct (guaranteed by problem).
- Very large n (up to 26, the total number of lowercase letters).

### Solution

```python
def minimumPushes(word):
    n = len(word)
    total_pushes = 0
    batch_push = 1  # Initial pushes per key
    
    # For each complete set of 8 letters
    full_batches = n // 8
    for _ in range(full_batches):
        total_pushes += batch_push * 8
        batch_push += 1
        
    # For any leftover letters (n % 8)
    if n % 8:
        total_pushes += batch_push * (n % 8)
    
    return total_pushes
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  (We loop at most n/8 times, plus handle leftovers; effectively O(n) for small n (≤26).)

- **Space Complexity:** O(1)  
  (Only constant extra space used—no auxiliary data structures.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if letters are repeated in the word?  
  *Hint: Consider the frequency of each letter, and adjust total pushes based on how often each is typed.*

- What if the keyboard has a different number of keys or each key supports a different number of letters?  
  *Hint: Generalize the batch size, and adapt the batching logic.*

- How would you design for Unicode or larger alphabets?  
  *Hint: Allow keys to hold more/less letters, adjust batching for larger n.*

### Summary
This problem relies on **batching/gathering pattern**—grouping items optimally for a cost that grows per batch. By placing as many letters as possible onto each key before moving to the next, you always achieve a minimal sum of repeated actions. This batching insight applies to many keypad, encoding, or grouping interview problems.