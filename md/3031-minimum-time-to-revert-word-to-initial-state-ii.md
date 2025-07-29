### Leetcode 3031 (Hard): Minimum Time to Revert Word to Initial State II [Practice](https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-ii)

### Description  
Given a string **word** of length n and an integer **k (1 ≤ k < n)**, you must perform the following operation every second:
- Remove the first k characters from the start of the string.
- Append *any* k characters to the end of the word (they don't need to be the ones removed).

Return the minimum time \( t > 0 \) such that, after performing this operation t times, the string returns to exactly its original state.

You have complete freedom in choosing the k characters appended each time.

### Examples  

**Example 1:**  
Input: `word = "abcde", k = 2`  
Output: `5`  
*Explanation:  
- Remove first 2 ("ab"), append any 2: "cde??"
- Next, "e??xx"
- The process cycles through all positions, the first time original is restored after 5 steps.*

**Example 2:**  
Input: `word = "aaaa", k = 1`  
Output: `4`  
*Explanation:  
- At each step, shift left by 1 and append any character.  
- In 4 steps, each index returns to original position, restoring word.*

**Example 3:**  
Input: `word = "abcabc", k = 3`  
Output: `2`  
*Explanation:  
- Remove 3, append 3: "abc" removed, "abc" appended, original after 2 steps.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Simulate each operation: repeatedly shift left by k, append k characters, and track the string until it matches the original.
  - Too slow: for n up to 10⁵, this could be O(n²).

- **Better observation:**  
  - Think: After t operations, has every original character returned to its original position?
  - Let’s look at the position mapping after each operation:
    - Each operation shifts all characters left by k, new slots are filled at the end.
    - For each original position i, after t operations, where does its character end up?
      - After each step, original index i moves to (i - k) mod n.
      - After t steps: i → (i - k*t) mod n.
    - For the string to map to its original state, all positions must return to their start: (i - k*t) mod n = i  ⇒ k*t ≡ 0 mod n.

- **Final reduction:**  
  - Smallest t > 0 such that k×t is a multiple of n (i.e., n divides k×t).
  - So, solution is the minimal t > 0 such that (k×t) mod n = 0.
  - This is t = n / gcd(n, k).

- **Why this is correct?**  
  - As n / gcd(n, k) steps ensure every position rotates to its original place.

- **Complexity:**  
  - Compute gcd(n, k), constant time.
  - Output n // gcd(n, k).

### Corner cases to consider  
- k == 1 or k == n - 1 (minimal/maximal shifts).
- n and k are co-prime (gcd = 1): result is n.
- n divisible by k: result is n // k.
- word with repeated characters — does not affect, as it’s about indices, not content.
- Very large n (verify gcd logic handles big numbers efficiently).

### Solution

```python
def minimumTimeToInitialState(word: str, k: int) -> int:
    # To restore the word to its initial state, we need minimal t > 0 so that (k×t) % n == 0.
    # That is, t = n // gcd(n, k)
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    n = len(word)
    g = gcd(n, k)
    return n // g
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log min(n, k))  
  Calculating gcd takes at most log(min(n, k)) steps; rest is constant time.

- **Space Complexity:** O(1)  
  Only a few integer variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the appended characters must match the removed ones in the same order?  
  *Hint: Consider string rotation and matching original.*

- Can you solve this if, instead of removing/appending, you’re allowed to rotate left/right by k positions?  
  *Hint: Use similar modular arithmetic reasoning.*

- How would the answer change if you had to restore *any* permutation, not necessarily the original?  
  *Hint: Think about permutation cycles and lcm (least common multiple).*

### Summary
This problem is a classic modular arithmetic and permutation cyclicity problem, reduced to finding the smallest t so that k×t is divisible by n, i.e. t = n / gcd(n, k). The coding pattern is number theory with gcd, and appears in periodic cycle, rotation, or operation-repeat-restore problems.