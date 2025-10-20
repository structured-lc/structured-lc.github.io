### Leetcode 12 (Medium): Integer to Roman [Practice](https://leetcode.com/problems/integer-to-roman)

### Description  
Given an **integer** between 1 and 3999, convert it to its **Roman numeral** string representation.  
Roman numerals use specific **symbols** (I, V, X, L, C, D, M) with rules:
- Combines these symbols additively (e.g., III = 3).
- For specific numbers, uses **subtractive notation**: e.g., IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.
Return the shortest valid Roman numeral form for the given integer.

### Examples  

**Example 1:**  
Input: `num = 3749`  
Output: `"MMMDCCXLIX"`  
Explanation:  
- 3000 → MMM  
- 700 → DCC  
- 40 → XL  
- 9 → IX  
Combined: MMM + DCC + XL + IX = **MMMDCCXLIX**.

**Example 2:**  
Input: `num = 58`  
Output: `"LVIII"`  
Explanation:  
- 50 → L  
- 8 → VIII  
Combined: L + VIII = **LVIII**.

**Example 3:**  
Input: `num = 1994`  
Output: `"MCMXCIV"`  
Explanation:  
- 1000 → M  
- 900 → CM  
- 90 → XC  
- 4 → IV  
Combined: M + CM + XC + IV = **MCMXCIV**.

### Thought Process (as if you’re the interviewee)  
To convert an integer to Roman numerals, the strategy is to **greedily match the largest possible Roman value** with the input number at each step.
- Start with two parallel lists: one for Roman values `[1000, 900, 500, ..., 1]` and one for their symbols `['M', 'CM', 'D', ..., 'I']`.
- For each pair, **subtract** the value from the number as many times as possible while **appending** the corresponding symbol.
- Continue until the input number is reduced to zero.

- **Brute-force idea:** Iterate for every single unit (e.g., appending 'I' for each 1), but that’s inefficient and misses subtractive notation rules.
- By using **predefined values** for the subtractive notations (900, 400, 90, etc.), this greedy approach automatically gives the correct result.
- This also ensures shortest-form output, as Roman numerals are always constructed with the largest possible symbols first.

### Corner cases to consider  
- Smallest values (1, 2, 3) → must work for repeated 'I'  
- Values triggering subtractive notation, e.g., 4 ('IV'), 9 ('IX'), 40 ('XL')
- Maximum allowed value, 3999, should output 'MMMCMXCIX'  
- All numbers comprised of only single-like numerals (e.g. 3000 = 'MMM')  
- 0 or negative input (out of bounds; problem states num ≥ 1)  
- Ensure numbers like 49 = 'XLIX' and 944 = 'CMXLIV' are handled properly  

### Solution

```python
def intToRoman(num: int) -> str:
    # Roman numeral mapping from largest to smallest, including subtractive notation
    values = [
        1000, 900, 500, 400, 
        100, 90, 50, 40, 
        10, 9, 5, 4, 1
    ]
    symbols = [
        'M', 'CM', 'D', 'CD', 
        'C', 'XC', 'L', 'XL', 
        'X', 'IX', 'V', 'IV', 'I'
    ]

    result = []
    for value, symbol in zip(values, symbols):
        # Add as many symbols as fit into num
        count = num // value
        if count:
            result.append(symbol * count)
            num -= value * count
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  The number of Roman numerals and their values is constant (always 13). For any input, the loop executes at most 13 times.

- **Space Complexity:** O(1)  
  No extra space proportional to the input; only fixed-size arrays and the result string (at most 15 chars for 3999).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle conversion if the range extended beyond 3999?  
  *Hint: Roman numerals traditionally don’t represent numbers greater than 3999, but you can use overlines or custom notations.*

- Could you write the reverse: Roman to Integer?  
  *Hint: Carefully handle subtractive cases; parse from left, compare values.*

- How can you validate whether a given Roman numeral string is valid or possibly ambiguous?  
  *Hint: Build a finite state machine or use regular expressions.*

### Summary
This problem uses a **greedy algorithm** and simple mapping. It’s a classic case for applying mapping arrays and iterative subtraction, matching the **integer-to-string conversion** and **decoding** pattern.
The pattern is common in problems requiring mapping one set of representations to another with rules — e.g., similar to Roman to integer conversion, integer to other numeral systems, or custom encoding tasks.


### Flashcard
Greedily subtract the largest possible Roman value at each step, appending its symbol, until the number is reduced to zero.

### Tags
Hash Table(#hash-table), Math(#math), String(#string)

### Similar Problems
- Roman to Integer(roman-to-integer) (Easy)
- Integer to English Words(integer-to-english-words) (Hard)