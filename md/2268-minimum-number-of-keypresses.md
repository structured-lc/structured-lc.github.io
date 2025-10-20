### Leetcode 2268 (Medium): Minimum Number of Keypresses [Practice](https://leetcode.com/problems/minimum-number-of-keypresses)

### Description  
You are given a string `s` consisting of lowercase English letters. Imagine you have a custom keypad with **9 buttons** (numbered 1 to 9), where each button can map to **at most 3 unique letters**. Each letter must be mapped to exactly *one* button, and all 26 lowercase English letters must be covered.  
When typing a letter:  
- If a button is mapped to 3 letters, then for the 1ˢᵗ letter, you need **1 keypress**, for the 2ⁿᵈ, **2 keypresses**, and 3ʳᵈ, **3 keypresses**.  
- You may choose how to distribute the letters among the buttons, but the mapping is fixed while typing.  
Given `s`, return the minimum number of keypresses needed to type `s` using the optimal button-to-letter mapping.

### Examples  

**Example 1:**  
Input: `s = "apple"`  
Output: `5`  
*Explanation: Distribute high-frequency letters to keys' 1ˢᵗ position. For example: 'a' (button 1 slot 1), 'p' (button 2 slot 1), 'l' (button 3 slot 1), 'e' (button 4 slot 1). Each needs 1 press. Total: 5.*

**Example 2:**  
Input: `s = "abcdabcdabcdabcdabcdabcdabcd"`  
Output: `28`  
*Explanation: If 'a','b','c','d' are button 1 slots 1–4, and each appears 7 times, each press is at most 2 presses per letter. So, total = 7 × 4 = 28.*

**Example 3:**  
Input: `s = "zzzzzzzzzzzz"`  
Output: `12`  
*Explanation: All 'z'. Wherever 'z' is mapped, every press costs 1 keypress: 12 × 1 = 12.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible letter-to-button assignments. There are too many possible mappings (combinatorial explosion), so that's not feasible.  
- **Optimize:**  
  - Since each button can have 3 letters and 9 buttons × 3 = 27 ≥ 26, we can always assign all letters.
  - Key insight: The **frequency** of each letter in `s` determines its contribution to the total keypresses.
  - We minimize total keypresses by putting the most frequent letters in the 1ˢᵗ position of the buttons, the next most frequent in the 2ⁿᵈ position, and so on.
- **Approach:**  
  1. Count occurrences of each character in `s`.
  2. Sort letters by frequency in descending order.
  3. Assign first 9 to the first slot of each button (cost: 1 press per appearance), next 9 to second slots (2 presses), last 8 to third slots (3 presses).
- **Trade-offs:**  
  - O(n) for counting and O(1) after—fast and scalable.
  - Greedy is optimal here since cost per letter is strictly increasing with slot number.

### Corner cases to consider  
- Empty string: Should return 0.
- String with all identical letters.
- Strings with only one letter.
- Minimum and maximum possible string lengths.
- All letters equally frequent.

### Solution

```python
def minimumKeypresses(s: str) -> int:
    # Frequency of each letter
    freq = [0] * 26  # 'a' to 'z'
    for ch in s:
        freq[ord(ch) - ord('a')] += 1

    # Sort frequencies descending
    freq.sort(reverse=True)
    
    total = 0
    for i in range(26):
        if freq[i] == 0:
            break  # Skip unused letters
        # Compute which slot: first 9 → slot 1, next 9 → slot 2, last 8 → slot 3
        slot = i // 9 + 1
        total += freq[i] * slot
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + 26 log 26) = O(n), where n = len(s). Counting frequencies: O(n), sorting up to 26 letters: negligible.
- **Space Complexity:** O(1), uses a fixed 26-element frequency array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if some letters could be omitted from the keypad?
  *Hint: Think about only mapping letters used in the input.*

- What if buttons could hold up to k letters, for arbitrary k?
  *Hint: Adjust the slot calculation: slot = i // k + 1.*

- How would you handle the problem if the cost of a keypress is different per slot (e.g., slot 1 = 1, slot 2 = 3, slot 3 = 7)?
  *Hint: Store costs in an array and use cost[slot] instead.*

### Summary
The problem leverages a **greedy counting and sorting pattern**: always assign the most frequent items to the lowest-cost choices. This is a common approach in optimizing assignment problems (see also: Huffman coding, job assignment, minimizing sum of weighted costs). The key is recognizing that sorting by frequency and assigning to "cheapest" slots (button positions) produces an optimal solution.


### Flashcard
Assign most frequent letters to the first position on each key to minimize total keypresses—greedy frequency sort.

### Tags
Hash Table(#hash-table), String(#string), Greedy(#greedy), Sorting(#sorting), Counting(#counting)

### Similar Problems
