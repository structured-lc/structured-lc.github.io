### Leetcode 2469 (Easy): Convert the Temperature [Practice](https://leetcode.com/problems/convert-the-temperature)

### Description  
Given a **float** value representing a temperature in **Celsius**, return a list where:
- The first value is the temperature converted to **Kelvin**.
- The second value is the temperature converted to **Fahrenheit**.  
The conversion formulas are straightforward:
- Kelvin = Celsius + 273.15
- Fahrenheit = Celsius × 1.80 + 32.00

### Examples  

**Example 1:**  
Input: `celsius = 36.50`  
Output: `[309.65, 97.70]`  
*Explanation: 36.50 + 273.15 = 309.65 (Kelvin), 36.50 × 1.80 + 32 = 97.70 (Fahrenheit)*

**Example 2:**  
Input: `celsius = 122.11`  
Output: `[395.26, 251.80]`  
*Explanation: 122.11 + 273.15 = 395.26 (Kelvin), 122.11 × 1.80 + 32 = 251.798 (rounded to 251.80)*

**Example 3:**  
Input: `celsius = 0.00`  
Output: `[273.15, 32.00]`  
*Explanation: 0.00 + 273.15 = 273.15 (Kelvin), 0.00 × 1.80 + 32 = 32.00 (Fahrenheit)*

### Thought Process (as if you’re the interviewee)  
First, I'll recall the conversion formulas:
- Kelvin is always Celsius + 273.15.
- Fahrenheit is Celsius × 1.80 + 32.00.

I don't need to handle input validation or rounding, as the output can naturally be a float due to Python's arithmetic.  
I just need to apply the two formulas to the input and return a list with both results.

This is an O(1) operation—no branching, no loops. There's no benefit from optimization or use of extra structures.  
It's best to write clean, readable code, with variable names matching the formulas for clarity.

### Corner cases to consider  
- **Zero input:** 0°C should be valid and gives precise conversions.  
- **Negative Celsius:** Make sure formula still works for negatives (e.g. -40 is valid).
- **Large values:** Unlikely, but make sure e.g. 10000°C does not overflow.
- **Extremely small/float values:** e.g. 0.001°C, check precision.
- **Return type:** Output should always be a list of two float values.

### Solution

```python
def convertTemperature(celsius: float) -> list[float]:
    # Convert Celsius to Kelvin
    kelvin = celsius + 273.15

    # Convert Celsius to Fahrenheit
    fahrenheit = celsius * 1.80 + 32.00

    # Return both values in a list
    return [kelvin, fahrenheit]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  There are only two arithmetic operations, regardless of the input.
- **Space Complexity:** O(1)  
  Only two float variables are stored; space does not depend on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle rounding both results to two decimal places?
  *Hint: Use Python’s built-in `round` function for float precision control.*

- How would you modify this if multiple Celsius values are given at once (as an array)?
  *Hint: Iterate through the array and apply the conversions to each element.*

- What if the input was in Fahrenheit and you needed to output both Celsius and Kelvin?
  *Hint: Derive the appropriate conversion formulas between Fahrenheit, Celsius, and Kelvin.*

### Summary
This is an example of a **direct formula application** pattern—just implement explicit mathematical formulas.  
It's common for introductory problems or places where the system’s behavior is defined entirely by well-known equations, such as unit conversions.  
Patterns like this apply to weight conversions, unit conversions in physics, or currency converters, where the challenge is mainly accuracy and clarity.