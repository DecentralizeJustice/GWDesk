<template>
  <v-card class="" >
    <v-card-title class="headline justify-center">
    Trivia Information
    </v-card-title>
    <v-divider/>
    <v-tabs vertical>
      <!-- <v-tab>
        <v-icon left>
          mdi-video
        </v-icon>
        Video
      </v-tab> -->
      <v-tab>
        <v-icon left>
          mdi-account-question
        </v-icon>
        General Info
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-help-circle
        </v-icon>
        Question Info
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-file-outline
        </v-icon>
        Terms of Service
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <ul class="text-h6">
             <li>
                <p >
                 This is a trivia game focused on cryptocurrencies.
                </p>
              </li>
              <li>
                 <p>
                  In order to win you must answer all 10 questions correctly and enter a valid human verificaion response.
                 </p>
              </li>
              <li>
                 <p>
                  All of the winners will split the winnning pot. For example if the pot size is 20 USD and 2 people answer all the quesions correctly, each of them will receive approximately 10 USD of cryptocurrency.
                 </p>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <!-- <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>

            <p>
              Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
            </p>

            <p class="mb-0">
              Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item> -->
      <!-- <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
            </p>

            <p>
              Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
            </p>

            <p>
              Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
            </p>

            <p>
              Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
            </p>

            <p class="mb-0">
              Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item> -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p class="text-h4">
              There will be 2 Types of Questions:
            </p>

            <ol>
             <li class="text-h6"><h4>Human Verifcation</h4>
               <p class="subtitle-1">
                 There will be 1 Open ended question at the beginning of the game and it will be used to determine if you are human or not.
                 There is no wrong answer to this question, just answer in a way that a human would answer. This question tries to prevent spam and automatic entries.
               </p>
             </li>
             <li class="text-h6"><h4>Main Questions</h4>
               <p class="subtitle-1">
                 There will be 10 multiple choice questions were there is only one correct answer. You will have approximately 10 seconds to answer each one.
                 In order to win you must answer all of these questions correctly and fast enough.
               </p>
             </li>
            </ol>
            <p class="subtitle-1">
              The subject of these questions will change every show. Taking our free courses will help you get some questions correct,
             but they do not contain all of the information needed to win.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <ol class="subtitle-1">
             <li>
                <p>
                 There is no purchase necessary to enter. Any over the age of 18 may participate. This contest is void where prohibited.
                </p>
              </li>
              <li>
                 <p>
                  We will not be held responsible for things that might prevent our app from working;
                  Such as a large amount of spam, cheating, an act of god, or a technical error.
                 </p>
              </li>
              <li>
                 <p>
                  All decisions that we make concerning who is a winner will be final.
                  We will take into consideration the quality of your human verification answer to prevent fraud and spam, and determine correct winners at our discretion.
                 </p>
              </li>
              <li>
                 <p>
                  By signing up for, installing and/or using the App in any manner, you agree to these Terms of Use and all other operating rules, policies and procedures that may be published from time to time through the App by us, each of which is incorporated by reference and each of which may be updated from time to time without notice to you.
                 </p>
              </li>
              <li>
                 <p>
                  We may, in our sole discretion, refuse to offer the Services to any person or entity and change its eligibility criteria at any time. You are solely responsible for ensuring that these Terms of Use are in compliance with all laws, rules and regulations applicable to you and the right to access the Services is revoked where these Terms of Use or use of the Services is prohibited or to the extent offering, sale or provision of the Services conflicts with any applicable law, rule or regulation.
                </p>
              </li>
              <li>
                 <p>
                  We reserve the right, in our sole discretion, to modify or replace any of these Terms of Use, or change, suspend, or discontinue the Services (including without limitation, the availability of any feature, database, or content) at any time by posting a notice on the App or by sending you notice through the Services, via email or by another appropriate means of electronic communication. We may also impose limits on certain features and services or restrict your access to parts or all of the Services without notice or liability. While we will timely provide notice of modifications, it is also your responsibility to check these Terms of Use periodically for changes. Your continued use of the Services following notification of any changes to these Terms of Use constitutes acceptance of those changes, which will apply to your continued use of the Services going forward. Your use of the Services is subject to the Terms of Use in effect at the time of such use.
                </p>
                <li>
                   <p>
                     You shall defend, indemnify, and hold harmless us, our affiliates and each of our and their respective employees, contractors, directors, suppliers and representatives from all liabilities, claims, and expenses, including reasonable attorneys’ fees, that arise from or relate to your use or misuse of, or access to, the Services, Content, or otherwise from your User Content, violation of these Terms of Use, or infringement by you, or any third party using your Account or identity in the Services, of any intellectual property or other right of any person or entity. We reserve the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will assist and cooperate with us in asserting any available defenses.
                  </p>
                </li>
                <li>
                   <p>
                     THE SERVICES AND CONTENT ARE PROVIDED "AS IS", “AS AVAILABLE” AND WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES IMPLIED BY ANY COURSE OF PERFORMANCE OR USAGE OF TRADE, ALL OF WHICH ARE EXPRESSLY DISCLAIMED. WE, AND OUR DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, PARTNERS AND CONTENT PROVIDERS DO NOT WARRANT THAT: (I) THE SERVICES WILL BE SECURE OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (II) ANY DEFECTS OR ERRORS WILL BE CORRECTED; (III) ANY CONTENT OR SOFTWARE AVAILABLE AT OR THROUGH THE SERVICES IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (IV) THE RESULTS OF USING THE SERVICES WILL MEET YOUR REQUIREMENTS. YOUR USE OF THE SERVICES IS SOLELY AT YOUR OWN RISK.
                   </p>
                </li>
                <li>
                   <p>
                     If for any reason the Service is not running as originally planned (e.g., if it becomes corrupted or does not allow the proper usage and processing of entries in accordance with the rules, or if infection by a computer virus, bugs, tampering, unauthorized intervention, actions by entrants, fraud, technical failures, or any other causes of any kind, in the sole opinion of Company corrupts or affects the administration, security, fairness, integrity or proper conduct of the Service), Company reserves the right, in its sole discretion, to disqualify any individual implicated in or relating to the cause and/or to cancel, terminate, extend, modify or suspend the Service, and select the winner(s) from all eligible entries. If such cancellation, termination, modification or suspension occurs, notification may be posted on the Site.
                   </p>
                </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-divider/>
    <v-card-actions>
      <v-btn
        color="red darken-1"
        @click="exit"
      >
        Exit
      </v-btn>
  </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [],
  components: {
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
    exit: function () {
      this.$emit('exit')
    }
  },
  watch: {
  },
  async mounted () {
  }
}
</script>
