### Leetcode 273 (Hard): Integer to English Words [Practice](https://leetcode.com/problems/integer-to-english-words)

### Description  
Given a non-negative integer less than 2³¹ − 1, convert it to its English words representation.  
You must map each group of digits to its word equivalent (ones, tens, hundreds, thousands, million, billion), respecting English grammar and number grouping.  
For example, 123 should become "One Hundred Twenty Three". The function should handle all numbers from 0 to 2,147,483,647.

### Examples  

**Example 1:**  
Input: `123`  
Output: `One Hundred Twenty Three`  
Explanation: Split into hundreds, convert pieces: 1→"One", 100→"Hundred", 23→"Twenty Three". Result: "One Hundred Twenty Three".

**Example 2:**  
Input: `12345`  
Output: `Twelve Thousand Three Hundred Forty Five`  
Explanation: 12→"Twelve", 345→"Three Hundred Forty Five". Combine with "Thousand": "Twelve Thousand Three Hundred Forty Five".

**Example 3:**  
Input: `1234567`  
Output: `One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven`  
Explanation: 
1→"One", 234→"Two Hundred Thirty Four", 567→"Five Hundred Sixty Seven".  
Bucket by millions/thousands: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven".

**Example 4:**  
Input: `1234567891`  
Output: `One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One`  
Explanation: 
1→"One", 234→"Two Hundred Thirty Four", 567→"Five Hundred Sixty Seven", 891→"Eight Hundred Ninety One".  
Groups: billion, million, thousand, hundred: combine accordingly.

### Thought Process (as if you’re the interviewee)  
Let’s break this into manageable chunks based on grouping:  
- English numbers are read in groups of thousands. Break the input into triplets (from right: ones, thousands, millions, billions).
- For each triplet, convert numbers less than 1000 to English.  
  - Numbers up to 19 have unique words.  
  - Multiples of ten (20, 30, ...) also have unique words.  
  - For 100–999, handle "X Hundred Y" recursively.
- Attach the appropriate scale word ("Thousand", "Million", "Billion") as you combine triplets.
- Combine all, skipping empty triplets or zeroes except if the entire input is 0 ("Zero").
- Watch for edge cases with zeros within or across triplets.
- Recursion or helper functions make the implementation clear and modular.
- Optimize by hard-coding unique words for 0-19 and tens, minimize string joins and spaces.

### Corner cases to consider  
- Input is `0` → should return `"Zero"`.
- Leading zeros (e.g., `00123`) are not possible in integer input, but design should safely ignore.
- Numbers exactly divisible by 1000, 1,000,000, etc., e.g. 1000 → "One Thousand".
- Numbers with intermediate zeros, e.g. 1000010 → "One Million Ten".
- Large numbers up to 2,147,483,647.
- Smallest possible group (single-digit) or triplet of all zeros between non-zero triplets.

### Solution

```python
# Integer to English Words

class Solution:
    def numberToWords(self, num: int) -> str:
        if num == 0:
            return "Zero"
        
        # Hardcode special words per English rules
        less_than_20 = [
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
            "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen"
        ]
        tens = [
            "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
        ]
        thousands = ["", "Thousand", "Million", "Billion"]
        
        def helper(n):
            # Convert numbers less than 1000
            if n == 0:
                return ""
            elif n < 20:
                return less_than_20[n] + " "
            elif n < 100:
                return tens[n // 10] + " " + helper(n % 10)
            else:
                return less_than_20[n // 100] + " Hundred " + helper(n % 100)
        
        res = ""
        for i in range(len(thousands)):
            # Process the last three digits
            if num % 1000 != 0:
                part = helper(num % 1000)
                res = part + thousands[i] + " " + res
            num //= 1000
            if num == 0:
                break
        
        return res.strip()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of digits in the input number.  
  Each group of three digits is processed once. Building the string and recursion over the digit groups is linear relative to the digit count.
- **Space Complexity:** O(n), for the recursion stack and the result string, where n is the number of digits. The recursive depth is at most 4 (billions) and storage for the answer is linear in output length.

### Potential follow-up questions (as if you’re the interviewer)  

- Extend function to support negative integers.  
  *Hint: How would you handle a leading minus sign in the English output?*

- Add support for decimals/floats (convert 123.45 to "One Hundred Twenty Three point Four Five").  
  *Hint: How to handle the "point" word and digits after decimal?*

- Support for other languages or regional English variances (e.g., British English: "and" in "One Hundred and Twenty Three").  
  *Hint: Can you make the mapping (hundreds/tens) configurable?*

### Summary
This problem uses the *divide and conquer* pattern to break the number into three-digit groups, converting each recursively into English words, and then assembling with scale words (thousand, million, billion). Hard-coding special cases (less than 20, tens, hundred, etc.) simplifies mapping. The approach is modular and reusable, applicable to problems requiring English stringification of numbers or similar number-to-string recursive decompositions.

### Tags
Math(#math), String(#string), Recursion(#recursion)

### Similar Problems
- Integer to Roman(integer-to-roman) (Medium)