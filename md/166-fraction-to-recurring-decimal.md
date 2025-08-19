### Leetcode 166 (Medium): Fraction to Recurring Decimal [Practice](https://leetcode.com/problems/fraction-to-recurring-decimal)

### Description  
Given two integers representing the **numerator** and **denominator** of a fraction, return its decimal representation as a string.  
- If the decimal part is repeating, enclose the repeating part in parentheses.  
- If there's a non-repeating fractional part, display it as is.
- Handle negative numbers and return the correct sign.
- Any repeating cycle should be as short as possible and marked with parentheses directly following the decimal point.  
For example,  
- Input: numerator = 2, denominator = 3  
- Output: "0.(6)"  
because 2 ÷ 3 = 0.666..., infinitely repeating 6.

### Examples  

**Example 1:**  
Input: `numerator = 1, denominator = 2`  
Output: `"0.5"`  
*Explanation: 1 divided by 2 = 0.5; there's no repeating part.*

**Example 2:**  
Input: `numerator = 2, denominator = 1`  
Output: `"2"`  
*Explanation: 2 divided by 1 = 2; no fractional part.*

**Example 3:**  
Input: `numerator = 2, denominator = 3`  
Output: `"0.(6)"`  
*Explanation: 2 divided by 3 = 0.666...; the 6 repeats infinitely, so we show it as 0.(6).*

**Example 4:**  
Input: `numerator = 4, denominator = 333`  
Output: `"0.(012)"`  
*Explanation: 4 ÷ 333 = 0.012012012..., "012" is the repeating sequence.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Simulate long division to generate digits after the decimal. For each step, multiply the remainder by 10, divide by denominator, keep the quotient as the next fractional digit, and update remainder.
- Key challenge: How do we know when the decimal repeats? If the same remainder appears **again**, the digits between these two occurrences will repeat indefinitely (just like detecting cycles in division).
- Use a map (dictionary) to remember the position where each remainder first appears. When a remainder repeats, that's the start of the cycle.
- Construct the string step by step:
   - Handle the sign.
   - Get the integral (whole) part.
   - For the fractional part, loop and record each remainder's position. If a remainder repeats, insert parentheses appropriately.
   - Take care of special cases: negative numbers, 0 numerator, denominator is negative, and edge cases where the result is an integer.

**Optimized solution:**  
- Use a hashmap to remember previously seen remainders → O(n) time, where n is the length of the repeating cycle or until the remainder hits 0.

### Corner cases to consider  
- Numerator is 0 (result is `"0"`)
- Denominator is negative (handle sign)
- Numerator is negative (handle sign)
- Both numerator and denominator are negative (should result in positive)
- Exact division (e.g. numerator is a multiple of denominator)
- Large inputs at 32-bit integer boundaries
- Fractional part is finite (remainder eventually becomes 0)
- Initial digits before the repeating cycle (e.g., `1/6 = 0.1(6)`)
- Repeating zero: denominator = 1 or -1 (result should not have ".0" or any decimal)
- Very long or large repeating cycles

### Solution

```python
def fractionToDecimal(numerator: int, denominator: int) -> str:
    # Special case: numerator is zero
    if numerator == 0:
        return "0"
    
    result = []

    # Handle the sign
    if (numerator < 0) ^ (denominator < 0):
        result.append('-')

    # Work with absolute values to avoid negative complications
    n, d = abs(numerator), abs(denominator)

    # Integer part
    integer_part = n // d
    result.append(str(integer_part))
    remainder = n % d

    # If no fractional part, return result
    if remainder == 0:
        return ''.join(result)

    result.append('.')

    # Map: remainder → position in result
    remainder_pos = {}

    while remainder != 0:
        # If we've seen this remainder before, it's a repeating cycle
        if remainder in remainder_pos:
            idx = remainder_pos[remainder]
            result.insert(idx, '(')
            result.append(')')
            break
        
        # Remember this remainder's position
        remainder_pos[remainder] = len(result)
        
        remainder *= 10
        digit = remainder // d
        result.append(str(digit))
        remainder %= d

    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), where k is the length of the fractional part before repeating or terminating. Each new remainder is processed at most once, since repeating happens only when a remainder matches a previous value.
- **Space Complexity:** O(k), where k is the number of unique remainders, stored in the map to detect repetition.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code to handle really large numbers or arbitrary-precision fractions?  
  *Hint: Think about using big integer types, or string-based math for very large values.*

- How can you support repeating decimals in languages or output formats that don't support parentheses (for example, JSON or certain data protocols)?  
  *Hint: Consider using another way to mark repeats, like two substrings, or markers.*

- What if only the length of the repeating cycle is needed, not the actual string?  
  *Hint: Simulate the same process but return the count when the repeat is found.*

### Summary
This problem uses a **long division simulation with remainder tracking**, a key method for detecting cycles in decimals. The main insight is mapping each remainder to its position, inserting parentheses when a repeat occurs. This same approach helps in converting fractions to decimals with cycles, and is a pattern useful in problems requiring detection of cycles or repeats within computational processes — such as in modulo- or state-tracking simulations.

### Tags
Hash Table(#hash-table), Math(#math), String(#string)

### Similar Problems
